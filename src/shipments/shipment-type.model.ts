import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "Shipment Type" })
export class ShipmentTypeModel {
	@Field(() => ID)
	id: string;

	@Field()
	name: string;
}
