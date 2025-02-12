import { ClientEntity } from "@/clients/client.entity";
import { CreateClientInput } from "../dto/create-client.input";

export interface IClientsRepository {
	createClient(
		client: CreateClientInput,
		tenantId: string,
	): Promise<ClientEntity>;
	getAllClients(tenantId: string): Promise<ClientEntity[]>;
	getClientById(id: string, tenantId: string): Promise<ClientEntity>;
}
