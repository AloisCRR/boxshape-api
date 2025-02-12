import { CreateInvoiceItemInput } from "../dto/create-invoice-item.input";
import { UpdateInvoiceItemInput } from "../dto/update-invoice-item.input";
import { InvoiceItemEntity } from "../invoice-item.entity";

export interface IInvoiceItemsRepository {
	createInvoiceItem(
		invoiceItem: CreateInvoiceItemInput,
		tenantId: string,
	): Promise<InvoiceItemEntity>;

	updateInvoiceItem(
		id: string,
		invoiceItem: UpdateInvoiceItemInput,
		tenantId: string,
	): Promise<InvoiceItemEntity>;

	getInvoiceItems(
		invoiceNumber: string,
		tenantId: string,
	): Promise<InvoiceItemEntity[]>;

	getInvoiceItemsWithShipment(
		invoiceNumber: string,
		tenantId: string,
	): Promise<InvoiceItemEntity[]>;
}
