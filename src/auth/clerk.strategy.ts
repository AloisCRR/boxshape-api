import { ClerkClient, User, verifyToken } from "@clerk/backend";
import {
	Inject,
	Injectable,
	Logger,
	UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-custom";

@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, "clerk") {
	private readonly logger = new Logger(ClerkStrategy.name);

	constructor(
		@Inject("ClerkClient")
		private readonly clerkClient: ClerkClient,
		private readonly configService: ConfigService,
	) {
		super();
	}

	async validate(req: Request): Promise<User> {
		const token = req.headers.authorization?.split(" ").pop();

		if (!token) {
			throw new UnauthorizedException("No token provided");
		}

		try {
			this.logger.log("Starting token verification");

			const tokenPayload = await verifyToken(token, {
				secretKey: this.configService.getOrThrow("CLERK_SECRET_KEY"),
			});

			this.logger.log("Token verification successful");

			this.logger.log(`Starting user retrieval for sub: ${tokenPayload.sub}`);

			const user = await this.clerkClient.users.getUser(tokenPayload.sub);

			this.logger.log(`User retrieved: ${user.id}`);

			return user;
		} catch (error) {
			this.logger.error("Error verifying token");
			throw new UnauthorizedException("Invalid token");
		}
	}
}
