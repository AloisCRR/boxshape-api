import { Inject, Injectable } from "@nestjs/common";
import { CreateInvoiceItemInput } from "./dto/create-invoice-item.input";
import { UpdateInvoiceItemInput } from "./dto/update-invoice-item.input";
import { IInvoiceItemsRepository } from "./interfaces/invoice-items.repository.interface";
import { InvoiceItemEntity } from "./invoice-item.entity";

@Injectable()
export class InvoiceItemsService {
	constructor(
		@Inject("IInvoiceItemsRepository")
		private readonly invoiceItemsRepository: IInvoiceItemsRepository,
	) {}

	async createInvoiceItem(
		invoiceItem: CreateInvoiceItemInput,
		tenantId: string,
	): Promise<InvoiceItemEntity> {
		return this.invoiceItemsRepository.createInvoiceItem(invoiceItem, tenantId);
	}

	async updateInvoiceItem(
		id: string,
		invoiceItem: UpdateInvoiceItemInput,
		tenantId: string,
	): Promise<InvoiceItemEntity> {
		return this.invoiceItemsRepository.updateInvoiceItem(
			id,
			invoiceItem,
			tenantId,
		);
	}

	async getInvoiceItems(
		invoiceNumber: string,
		tenantId: string,
	): Promise<InvoiceItemEntity[]> {
		return this.invoiceItemsRepository.getInvoiceItems(invoiceNumber, tenantId);
	}

	async getInvoiceItemsWithShipment(
		invoiceNumber: string,
		tenantId: string,
	): Promise<InvoiceItemEntity[]> {
		return this.invoiceItemsRepository.getInvoiceItemsWithShipment(
			invoiceNumber,
			tenantId,
		);
	}
}
