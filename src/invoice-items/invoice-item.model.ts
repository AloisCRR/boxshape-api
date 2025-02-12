import { ShipmentModel } from "@/shipments/shipment.model";
import { Field, Float, ID, ObjectType } from "@nestjs/graphql";
import { InvoiceModel } from "../invoices/invoice.model";
import { InvoiceItemEntity } from "./invoice-item.entity";

@ObjectType({ description: "Invoice Item" })
export class InvoiceItemModel implements InvoiceItemEntity {
	@Field(() => ID)
	id: string;

	@Field()
	invoiceNumber: string;

	@Field(() => Float)
	amount: number;

	@Field()
	trackingCode: string;

	@Field({ nullable: true })
	description?: string;

	@Field(() => ID)
	shipmentId: string;

	@Field(() => InvoiceModel, { nullable: true })
	invoice?: InvoiceModel;

	@Field(() => ShipmentModel, { nullable: true })
	shipment?: ShipmentModel;
}
