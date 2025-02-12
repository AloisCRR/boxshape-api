import { ClientEntity } from "@/clients/client.entity";
import { Inject, Injectable } from "@nestjs/common";
import { CreateClientInput } from "./dto/create-client.input";
import { IClientsRepository } from "./interfaces/clients.repository.interface";

@Injectable()
export class ClientsService {
	constructor(
		@Inject("IClientsRepository")
		private readonly clientsRepository: IClientsRepository,
	) {}

	async getAllClients(tenantId: string): Promise<ClientEntity[]> {
		return this.clientsRepository.getAllClients(tenantId);
	}

	async getClientById(id: string, tenantId: string): Promise<ClientEntity> {
		return this.clientsRepository.getClientById(id, tenantId);
	}

	async createClient(
		client: CreateClientInput,
		tenantId: string,
	): Promise<ClientEntity> {
		return this.clientsRepository.createClient(client, tenantId);
	}
}
