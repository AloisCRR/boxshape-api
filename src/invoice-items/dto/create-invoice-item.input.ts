import { Field, Float, ID, InputType } from "@nestjs/graphql";
import { IsNumber, IsString, IsUUID } from "class-validator";

@InputType()
export class CreateInvoiceItemInput {
	@Field()
	@IsString()
	invoiceNumber: string;

	@Field(() => Float)
	@IsNumber()
	amount: number;

	@Field()
	@IsString()
	trackingCode: string;

	@Field({ nullable: true })
	description?: string;

	@Field(() => ID)
	@IsUUID()
	shipmentId: string;
}
