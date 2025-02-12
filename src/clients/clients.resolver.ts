import { ClientEntity } from "@/clients/client.entity";
import { User } from "@clerk/backend";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { ClientModel } from "./client.model";
import { ClientsService } from "./clients.service";
import { CreateClientInput } from "./dto/create-client.input";

@Resolver(() => ClientModel)
export class ClientsResolver {
	constructor(private readonly clientsService: ClientsService) {}

	@Mutation(() => ClientModel)
	async createClient(
		@Args("input") input: CreateClientInput,
		@CurrentUser() user: User,
	): Promise<ClientEntity> {
		return this.clientsService.createClient(input, user.id);
	}

	@Query(() => [ClientModel])
	async clients(@CurrentUser() user: User): Promise<ClientEntity[]> {
		return this.clientsService.getAllClients(user.id);
	}

	@Query(() => ClientModel)
	async client(
		@Args("id") id: string,
		@CurrentUser() user: User,
	): Promise<ClientEntity> {
		return this.clientsService.getClientById(id, user.id);
	}
}
