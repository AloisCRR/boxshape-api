import { WebhookEvent } from "@clerk/backend";
import {
	Body,
	Controller,
	Headers,
	InternalServerErrorException,
	Logger,
	Post,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient } from "@tursodatabase/api";
import { createHash } from "node:crypto";
import { Public } from "src/decorators/public.decorator";
import { Webhook } from "svix";

const allowedEvents = ["user.created"];

@Controller("webhook")
export class WebhookController {
	private readonly logger = new Logger(WebhookController.name);

	constructor(private readonly configService: ConfigService) {}

	@Public()
	@Post("user-created")
	async handleUserCreated(
		@Body() body: Record<string, unknown>,
		@Headers() headers: Record<string, string>,
	) {
		const WEBHOOK_SECRET = this.configService.getOrThrow(
			"CLERK_WEBHOOK_SECRET",
		);

		if (!WEBHOOK_SECRET) {
			throw new Error(
				"Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
			);
		}

		const svix_id = headers["svix-id"];
		const svix_timestamp = headers["svix-timestamp"];
		const svix_signature = headers["svix-signature"];

		if (!svix_id || !svix_timestamp || !svix_signature) {
			return new Response("Error occurred -- no svix headers", {
				status: 400,
			});
		}

		const wh = new Webhook(WEBHOOK_SECRET);

		let evt: WebhookEvent;

		try {
			evt = wh.verify(JSON.stringify(body), {
				"svix-id": svix_id,
				"svix-timestamp": svix_timestamp,
				"svix-signature": svix_signature,
			}) as WebhookEvent;
		} catch (err) {
			this.logger.error("Error verifying webhook:", err);
			return new Response("Error occured", {
				status: 400,
			});
		}

		const { id } = evt.data;
		const eventType = evt.type;

		if (!id) {
			return new Response("No ID found", {
				status: 400,
			});
		}

		if (!allowedEvents.includes(eventType)) {
			return new Response("Event not allowed", {
				status: 400,
			});
		}

		const databaseName = createHash("md5").update(id).digest("hex");

		const turso = createClient({
			token: this.configService.getOrThrow("TURSO_AUTH_TOKEN"),
			org: this.configService.getOrThrow("TURSO_ORG"),
		});

		try {
			await turso.databases.create(databaseName, {
				schema: this.configService.getOrThrow("TURSO_DATABASE_NAME"),
				group: this.configService.getOrThrow("TURSO_GROUP"),
			});
		} catch (err) {
			this.logger.error("Error processing webhook:", err);

			throw new InternalServerErrorException("Error processing webhook");
		}

		// 3. Respond to the webhook provider
		return { received: true };
	}
}
