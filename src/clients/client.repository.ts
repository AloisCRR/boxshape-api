import { Injectable } from "@nestjs/common";
import { PrismaTenancyService } from "src/common/prisma/prisma-tenancy.service";
import { ClientEntity } from "./client.entity";
import { CreateClientInput } from "./dto/create-client.input";
import { IClientsRepository } from "./interfaces/clients.repository.interface";

@Injectable()
export class ClientRepository implements IClientsRepository {
	constructor(private readonly prisma: PrismaTenancyService) {}

	async getAllClients(tenantId: string): Promise<ClientEntity[]> {
		const prisma = await this.prisma.initializePrismaClient(tenantId);

		return prisma.client.findMany();
	}

	async createClient(
		client: CreateClientInput,
		tenantId: string,
	): Promise<ClientEntity> {
		const prisma = await this.prisma.initializePrismaClient(tenantId);

		return prisma.client.create({
			data: client,
		});
	}
}
