import { Field, Float, ID, ObjectType } from "@nestjs/graphql";
import { ClientModel } from "../clients/client.model";
import { ShipmentTypeModel } from "./shipment-type.model";
import { ShipmentEntity } from "./shipment.entity";

@ObjectType({ description: "Shipment" })
export class ShipmentModel implements ShipmentEntity {
	@Field(() => ID)
	id: string;

	@Field(() => ID)
	clientId: string;

	@Field(() => ID)
	shipmentTypeId: string;

	@Field(() => Float)
	price: number;

	@Field()
	unit: string;

	@Field({ nullable: true })
	poBoxNumber?: string;

	@Field()
	created: Date;

	@Field()
	updated: Date;

	@Field(() => ClientModel, { nullable: true })
	client?: ClientModel;

	@Field(() => ShipmentTypeModel, { nullable: true })
	shipmentType?: ShipmentTypeModel;
}
