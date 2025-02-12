import { InvoiceModel } from "@/invoices/invoice.model";
import { InputType, OmitType, PartialType } from "@nestjs/graphql";

@InputType()
class InvoiceInputType extends OmitType(
	InvoiceModel,
	["client", "status"] as const,
	InputType,
) {}

@InputType()
export class UpdateInvoiceInput extends PartialType(InvoiceInputType) {}
