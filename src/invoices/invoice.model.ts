import { InvoiceStatusModel } from "@/invoices/invoice-status.model";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ClientModel } from "../clients/client.model";
import { InvoiceEntity } from "./invoice.entity";

@ObjectType({ description: "Invoice" })
export class InvoiceModel implements InvoiceEntity {
	@Field(() => ID)
	id: string;

	@Field()
	number: string;

	@Field(() => ID)
	clientId: string;

	@Field(() => ID)
	statusId: string;

	@Field()
	created: Date;

	@Field()
	updated: Date;

	@Field(() => ClientModel, { nullable: true })
	client?: ClientModel;

	@Field(() => InvoiceStatusModel, { nullable: true })
	status?: InvoiceStatusModel;
}
