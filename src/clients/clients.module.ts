import { Module } from "@nestjs/common";
import { ClientRepository } from "./client.repository";
import { ClientsResolver } from "./clients.resolver";
import { ClientsService } from "./clients.service";

@Module({
	providers: [
		ClientsService,
		ClientsResolver,
		{
			provide: "IClientsRepository",
			useClass: ClientRepository,
		},
	],
})
export class ClientsModule {}
