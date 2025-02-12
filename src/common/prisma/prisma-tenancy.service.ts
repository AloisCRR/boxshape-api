import { createClient as createLibsqlClient } from "@libsql/client";
import {
	Injectable,
	Logger,
	NotFoundException,
	OnModuleDestroy,
	UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "@prisma/client";
import { createClient as createTursoClient } from "@tursodatabase/api"; // Import for Turso
import { createHash } from "node:crypto";

@Injectable()
export class PrismaTenancyService implements OnModuleDestroy {
	private readonly logger = new Logger(PrismaTenancyService.name);
	private tursoClient;
	private prismaClients: Map<string, PrismaClient> = new Map();

	constructor(private readonly configService: ConfigService) {
		this.tursoClient = createTursoClient({
			token: this.configService.getOrThrow("TURSO_AUTH_TOKEN"),
			org: this.configService.getOrThrow("TURSO_ORG"),
		});
	}

	async getPrismaClient(dbName: string) {
		if (!dbName) {
			throw new UnauthorizedException("User not authenticated");
		}

		const hashedDbName = createHash("md5").update(dbName).digest("hex");

		const cachedClient = this.prismaClients.get(hashedDbName);

		// Return existing client if available
		if (cachedClient) {
			return cachedClient;
		}

		// Create new client if database exists
		const databaseExists = await this.checkDatabaseExists(hashedDbName);
		if (!databaseExists) {
			throw new NotFoundException(`Database ${dbName} not found`);
		}

		const client = await this.createPrismaClient(hashedDbName);
		this.prismaClients.set(hashedDbName, client);

		return client;
	}

	private async createPrismaClient(hashedDbName: string) {
		const url = this.getDatabaseUrl(hashedDbName);
		const libsql = createLibsqlClient({
			url: url,
			authToken: this.configService.getOrThrow("TURSO_GROUP_AUTH_TOKEN"),
		});

		const adapter = new PrismaLibSQL(libsql);
		const prisma = new PrismaClient({
			adapter,
			log: ["query", "info", "warn", "error"],
		});

		await prisma.$connect();

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

	async onModuleDestroy() {
		await Promise.all(
			[...this.prismaClients.values()].map((client) => client.$disconnect()),
		);
	}
}
