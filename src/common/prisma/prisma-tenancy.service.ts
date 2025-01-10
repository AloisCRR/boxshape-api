import { createClient as createLibsqlClient } from "@libsql/client";
import {
	Injectable,
	Logger,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";
import { createClient as createTursoClient } from "@tursodatabase/api"; // Import for Turso
import { createHash } from "node:crypto";

@Injectable()
export class PrismaTenancyService {
	private readonly logger = new Logger(PrismaTenancyService.name, {
		timestamp: true,
	});
	private tursoClient;

	constructor(private readonly configService: ConfigService) {
		this.tursoClient = createTursoClient({
			token: this.configService.getOrThrow("TURSO_AUTH_TOKEN"),
			org: this.configService.getOrThrow("TURSO_ORG"),
		});
	}

	async initializePrismaClient(dbName: string) {
		if (!dbName) {
			throw new UnauthorizedException("User not authenticated");
		}

		const hashedDbName = createHash("md5").update(dbName).digest("hex");

		this.logger.log(`Checking database ${hashedDbName} exists`);

		const databaseExists = await this.checkDatabaseExists(hashedDbName);

		if (!databaseExists) {
			throw new NotFoundException(`Database ${dbName} not found`);
		}

		this.logger.log(`Database ${dbName} exists`);

		this.logger.log(`Initializing Prisma client for database ${dbName}`);

		const url = this.getDatabaseUrl(hashedDbName);

		const libsql = createLibsqlClient({
			url: url,
			authToken: this.configService.getOrThrow("TURSO_GROUP_AUTH_TOKEN"),
		});

		const adapter = new PrismaLibSQL(libsql);

		const prisma = new PrismaClient({
			adapter,
			log: [
				"query",
				"info",
				"warn",
				"error",
				{ emit: "event", level: "query" },
			],
		});

		prisma.$on("query", (event) => {
			this.logger.log(`Query duration: ${event.duration}ms`);
		});

		await prisma.$connect();

		this.logger.log(`Prisma client initialized for database ${dbName}`);

		return prisma;
	}

	private async checkDatabaseExists(dbName: string): Promise<boolean> {
		try {
			await this.tursoClient.databases.get(dbName);
			return true;
		} catch (error) {
			this.logger.error("Error checking database existence");
			return false;
		}
	}

	private getDatabaseUrl(dbName: string): string {
		return `libsql://${dbName}-${this.configService.getOrThrow("TURSO_ORG")}.turso.io`;
	}
}
