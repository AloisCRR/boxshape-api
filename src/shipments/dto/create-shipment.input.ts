import { Field, Float, ID, InputType } from "@nestjs/graphql";
import { IsNumber, IsString, IsUUID } from "class-validator";

@InputType()
export class CreateShipmentInput {
	@Field(() => ID)
	@IsUUID()
	clientId: string;

	@Field(() => ID)
	@IsUUID()
	shipmentTypeId: string;

	@Field(() => Float)
	@IsNumber()
	price: number;

	@Field()
	@IsString()
	unit: string;

	@Field({ nullable: true })
	poBoxNumber?: string;
}
