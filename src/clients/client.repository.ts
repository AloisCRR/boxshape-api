import { ClientEntity } from "@/clients/client.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaTenancyService } from "src/common/prisma/prisma-tenancy.service";
import { CreateClientInput } from "./dto/create-client.input";
import { IClientsRepository } from "./interfaces/clients.repository.interface";

@Injectable()
export class ClientRepository implements IClientsRepository {
	constructor(private readonly prisma: PrismaTenancyService) {}

	async getAllClients(tenantId: string): Promise<ClientEntity[]> {
		const prisma = await this.prisma.getPrismaClient(tenantId);

		return prisma.client.findMany();
	}

	async createClient(
		client: CreateClientInput,
		tenantId: string,
	): Promise<ClientEntity> {
		const prisma = await this.prisma.getPrismaClient(tenantId);

		return prisma.client.create({
			data: client,
		});
	}

	async getClientById(id: string, tenantId: string): Promise<ClientEntity> {
		const prisma = await this.prisma.getPrismaClient(tenantId);

		const client = await prisma.client.findUnique({ where: { id } });

		if (!client) {
			throw new NotFoundException("Client not found");
		}

		return client;
	}
}
