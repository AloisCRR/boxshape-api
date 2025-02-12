import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaTenancyService } from "src/common/prisma/prisma-tenancy.service";
import { CreateShipmentInput } from "./dto/create-shipment.input";
import { UpdateShipmentInput } from "./dto/update-shipment.input";
import { IShipmentsRepository } from "./interfaces/shipments.repository.interface";
import { ShipmentEntity } from "./shipment.entity";

@Injectable()
export class ShipmentsRepository implements IShipmentsRepository {
	constructor(private readonly prisma: PrismaTenancyService) {}

	async createShipment(
		shipment: CreateShipmentInput,
		tenantId: string,
	): Promise<ShipmentEntity> {
		const prisma = await this.prisma.getPrismaClient(tenantId);

		return prisma.shipment.create({
			data: shipment,
			include: {
				client: true,
				shipmentType: true,
			},
		});
	}

	async updateShipment(
		id: string,
		shipment: UpdateShipmentInput,
		tenantId: string,
	): Promise<ShipmentEntity> {
		const prisma = await this.prisma.getPrismaClient(tenantId);

		const existingShipment = await prisma.shipment.findUnique({
			where: { id },
		});

		if (!existingShipment) {
			throw new NotFoundException(`Shipment with ID ${id} not found`);
		}

		return prisma.shipment.update({
			where: { id },
			data: shipment,
			include: {
				client: true,
				shipmentType: true,
			},
		});
	}

	async getShipments(tenantId: string): Promise<ShipmentEntity[]> {
		const prisma = await this.prisma.getPrismaClient(tenantId);

		return prisma.shipment.findMany({
			include: {
				shipmentType: true,
			},
		});
	}

	async getShipmentById(id: string, tenantId: string): Promise<ShipmentEntity> {
		const prisma = await this.prisma.getPrismaClient(tenantId);

		const shipment = await prisma.shipment.findUnique({
			where: { id },
			include: {
				client: true,
				shipmentType: true,
			},
		});

		if (!shipment) {
			throw new NotFoundException(`Shipment with ID ${id} not found`);
		}

		return shipment;
	}

	async getShipmentsWithClient(tenantId: string): Promise<ShipmentEntity[]> {
		const prisma = await this.prisma.getPrismaClient(tenantId);

		return prisma.shipment.findMany({
			include: {
				client: true,
				shipmentType: true,
			},
		});
	}

	async getShipmentsOfClient(
		clientId: string,
		tenantId: string,
	): Promise<ShipmentEntity[]> {
		const prisma = await this.prisma.getPrismaClient(tenantId);

		return prisma.shipment.findMany({
			where: { clientId },
			include: {
				shipmentType: true,
			},
		});
	}
}
