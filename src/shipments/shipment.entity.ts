export class ShipmentEntity {
	id: string;
	clientId: string;
	shipmentTypeId: string;
	price: number;
	unit: string;
	poBoxNumber?: string | null;
	created: Date;
	updated: Date;
}
