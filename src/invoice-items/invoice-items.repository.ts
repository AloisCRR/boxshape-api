import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaTenancyService } from "src/common/prisma/prisma-tenancy.service";
import { CreateInvoiceItemInput } from "./dto/create-invoice-item.input";
import { UpdateInvoiceItemInput } from "./dto/update-invoice-item.input";
import { IInvoiceItemsRepository } from "./interfaces/invoice-items.repository.interface";
import { InvoiceItemEntity } from "./invoice-item.entity";

@Injectable()
export class InvoiceItemsRepository implements IInvoiceItemsRepository {
	constructor(private readonly prisma: PrismaTenancyService) {}

	async createInvoiceItem(
		invoiceItem: CreateInvoiceItemInput,
		tenantId: string,
	): Promise<InvoiceItemEntity> {
		const prisma = await this.prisma.getPrismaClient(tenantId);

		return prisma.invoiceItem.create({
			data: invoiceItem,
			include: {
				invoice: true,
				shipment: true,
			},
		});
	}

	async updateInvoiceItem(
		id: string,
		invoiceItem: UpdateInvoiceItemInput,
		tenantId: string,
	): Promise<InvoiceItemEntity> {
		const prisma = await this.prisma.getPrismaClient(tenantId);

		const existingItem = await prisma.invoiceItem.findUnique({
			where: { id },
		});

		if (!existingItem) {
			throw new NotFoundException(`Invoice item with ID ${id} not found`);
		}

		return prisma.invoiceItem.update({
			where: { id },
			data: invoiceItem,
			include: {
				invoice: true,
				shipment: true,
			},
		});
	}

	async getInvoiceItems(
		invoiceNumber: string,
		tenantId: string,
	): Promise<InvoiceItemEntity[]> {
		const prisma = await this.prisma.getPrismaClient(tenantId);

		return prisma.invoiceItem.findMany({
			where: { invoiceNumber },
			include: {
				invoice: true,
				shipment: true,
			},
		});
	}

	async getInvoiceItemsWithShipment(
		invoiceNumber: string,
		tenantId: string,
	): Promise<InvoiceItemEntity[]> {
		const prisma = await this.prisma.getPrismaClient(tenantId);

		return prisma.invoiceItem.findMany({
			where: { invoiceNumber },
			include: {
				invoice: true,
				shipment: {
					include: {
						shipmentType: true,
					},
				},
			},
		});
	}
}
