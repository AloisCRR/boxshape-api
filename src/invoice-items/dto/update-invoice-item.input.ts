import { InputType, PartialType } from "@nestjs/graphql";
import { CreateInvoiceItemInput } from "./create-invoice-item.input";

@InputType()
export class UpdateInvoiceItemInput extends PartialType(
	CreateInvoiceItemInput,
) {}
