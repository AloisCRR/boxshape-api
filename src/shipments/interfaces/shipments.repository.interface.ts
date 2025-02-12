import { CreateShipmentInput } from "../dto/create-shipment.input";
import { UpdateShipmentInput } from "../dto/update-shipment.input";
import { ShipmentEntity } from "../shipment.entity";

export interface IShipmentsRepository {
	createShipment(
		shipment: CreateShipmentInput,
		tenantId: string,
	): Promise<ShipmentEntity>;

	updateShipment(
		id: string,
		shipment: UpdateShipmentInput,
		tenantId: string,
	): Promise<ShipmentEntity>;

	getShipments(tenantId: string): Promise<ShipmentEntity[]>;

	getShipmentById(id: string, tenantId: string): Promise<ShipmentEntity>;

	getShipmentsWithClient(tenantId: string): Promise<ShipmentEntity[]>;

	getShipmentsOfClient(
		clientId: string,
		tenantId: string,
	): Promise<ShipmentEntity[]>;
}
