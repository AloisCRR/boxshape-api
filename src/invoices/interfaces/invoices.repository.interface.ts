import { CreateInvoiceInput } from "../dto/create-invoice.input";
import { UpdateInvoiceInput } from "../dto/update-invoice.input";
import { InvoiceEntity } from "../invoice.entity";

export interface IInvoicesRepository {
	createInvoice(
		invoice: CreateInvoiceInput,
		tenantId: string,
	): Promise<InvoiceEntity>;

	getAllInvoices(tenantId: string): Promise<InvoiceEntity[]>;

	getInvoiceById(id: string, tenantId: string): Promise<InvoiceEntity>;

	getInvoicesByClientId(
		clientId: string,
		tenantId: string,
	): Promise<InvoiceEntity[]>;

	updateInvoice(
		id: string,
		invoice: UpdateInvoiceInput,
		tenantId: string,
	): Promise<InvoiceEntity>;
}
