import { Inject, Injectable } from "@nestjs/common";
import { CreateShipmentInput } from "./dto/create-shipment.input";
import { UpdateShipmentInput } from "./dto/update-shipment.input";
import { IShipmentsRepository } from "./interfaces/shipments.repository.interface";
import { ShipmentEntity } from "./shipment.entity";

@Injectable()
export class ShipmentsService {
	constructor(
		@Inject("IShipmentsRepository")
		private readonly shipmentsRepository: IShipmentsRepository,
	) {}

	async createShipment(
		shipment: CreateShipmentInput,
		tenantId: string,
	): Promise<ShipmentEntity> {
		return this.shipmentsRepository.createShipment(shipment, tenantId);
	}

	async updateShipment(
		id: string,
		shipment: UpdateShipmentInput,
		tenantId: string,
	): Promise<ShipmentEntity> {
		return this.shipmentsRepository.updateShipment(id, shipment, tenantId);
	}

	async getShipments(tenantId: string): Promise<ShipmentEntity[]> {
		return this.shipmentsRepository.getShipments(tenantId);
	}

	async getShipmentById(id: string, tenantId: string): Promise<ShipmentEntity> {
		return this.shipmentsRepository.getShipmentById(id, tenantId);
	}

	async getShipmentsWithClient(tenantId: string): Promise<ShipmentEntity[]> {
		return this.shipmentsRepository.getShipmentsWithClient(tenantId);
	}

	async getShipmentsOfClient(
		clientId: string,
		tenantId: string,
	): Promise<ShipmentEntity[]> {
		return this.shipmentsRepository.getShipmentsOfClient(clientId, tenantId);
	}
}
