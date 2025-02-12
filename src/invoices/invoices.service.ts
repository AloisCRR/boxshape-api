import { Inject, Injectable } from "@nestjs/common";
import { CreateInvoiceInput } from "./dto/create-invoice.input";
import { UpdateInvoiceInput } from "./dto/update-invoice.input";
import { IInvoicesRepository } from "./interfaces/invoices.repository.interface";
import { InvoiceEntity } from "./invoice.entity";

@Injectable()
export class InvoicesService {
	constructor(
		@Inject("IInvoicesRepository")
		private readonly invoicesRepository: IInvoicesRepository,
	) {}

	async getAllInvoices(tenantId: string): Promise<InvoiceEntity[]> {
		return this.invoicesRepository.getAllInvoices(tenantId);
	}

	async getInvoiceById(id: string, tenantId: string): Promise<InvoiceEntity> {
		return this.invoicesRepository.getInvoiceById(id, tenantId);
	}

	async getInvoicesByClientId(
		clientId: string,
		tenantId: string,
	): Promise<InvoiceEntity[]> {
		return this.invoicesRepository.getInvoicesByClientId(clientId, tenantId);
	}

	async createInvoice(
		invoice: CreateInvoiceInput,
		tenantId: string,
	): Promise<InvoiceEntity> {
		return this.invoicesRepository.createInvoice(invoice, tenantId);
	}

	async updateInvoice(
		id: string,
		invoice: UpdateInvoiceInput,
		tenantId: string,
	): Promise<InvoiceEntity> {
		return this.invoicesRepository.updateInvoice(id, invoice, tenantId);
	}
}
