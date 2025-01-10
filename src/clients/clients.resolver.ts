import { User } from "@clerk/backend";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { Client } from "./client.model";
import { ClientsService } from "./clients.service";
import { CreateClientInput } from "./dto/create-client.input";

@Resolver(() => Client)
export class ClientsResolver {
	constructor(private readonly clientsService: ClientsService) {}

	@Mutation(() => Client)
	async createClient(
		@Args("input") input: CreateClientInput,
		@CurrentUser() user: User,
	): Promise<Client> {
		return this.clientsService.createClient(input, user.id);
	}

	@Query(() => [Client])
	async clients(@CurrentUser() user: User): Promise<Client[]> {
		return this.clientsService.getAllClients(user.id);
	}
}
