import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaTenancyService } from "src/common/prisma/prisma-tenancy.service";
import { CreateInvoiceInput } from "./dto/create-invoice.input";
import { UpdateInvoiceInput } from "./dto/update-invoice.input";
import { IInvoicesRepository } from "./interfaces/invoices.repository.interface";
import { InvoiceEntity } from "./invoice.entity";

@Injectable()
export class InvoiceRepository implements IInvoicesRepository {
	constructor(private readonly prisma: PrismaTenancyService) {}

	async getAllInvoices(tenantId: string): Promise<InvoiceEntity[]> {
		const prisma = await this.prisma.getPrismaClient(tenantId);

		return prisma.invoice.findMany({
			include: {
				status: true,
				client: true,
			},
		});
	}

	async getInvoiceById(id: string, tenantId: string): Promise<InvoiceEntity> {
		const prisma = await this.prisma.getPrismaClient(tenantId);

		const invoice = await prisma.invoice.findUnique({
			where: { id },
			include: {
				status: true,
				client: true,
			},
		});

		if (!invoice) {
			throw new NotFoundException("Invoice not found");
		}

		return invoice;
	}

	async getInvoicesByClientId(
		clientId: string,
		tenantId: string,
	): Promise<InvoiceEntity[]> {
		const prisma = await this.prisma.getPrismaClient(tenantId);
		return prisma.invoice.findMany({
			where: { clientId },
			include: {
				status: true,
				client: true,
			},
		});
	}

	async createInvoice(
		invoice: CreateInvoiceInput,
		tenantId: string,
	): Promise<InvoiceEntity> {
		const prisma = await this.prisma.getPrismaClient(tenantId);

		// Generate a unique invoice number (you might want to implement your own logic)
		const number = `INV-${Date.now()}`;

		return prisma.invoice.create({
			data: {
				number,
				clientId: invoice.clientId,
				statusId: invoice.statusId, // You'll need to add this to CreateInvoiceInput
			},
			include: {
				status: true,
				client: true,
			},
		});
	}

	async updateInvoice(
		id: string,
		invoice: UpdateInvoiceInput,
		tenantId: string,
	): Promise<InvoiceEntity> {
		const prisma = await this.prisma.getPrismaClient(tenantId);

		const updateData: Partial<InvoiceEntity> = {};

		if (invoice.clientId !== undefined) updateData.clientId = invoice.clientId;
		if (invoice.statusId !== undefined) updateData.statusId = invoice.statusId;

		return prisma.invoice.update({
			where: { id },
			data: updateData,
			include: {
				status: true,
				client: true,
			},
		});
	}
}
