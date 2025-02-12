import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class CreateInvoiceInput {
	@Field(() => ID)
	@IsUUID()
	clientId: string;

	@Field(() => ID)
	@IsUUID()
	statusId: string;
}
