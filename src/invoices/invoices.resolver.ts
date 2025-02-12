import { User } from "@clerk/backend";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { CreateInvoiceInput } from "./dto/create-invoice.input";
import { UpdateInvoiceInput } from "./dto/update-invoice.input";
import { InvoiceModel } from "./invoice.model";
import { InvoicesService } from "./invoices.service";

@Resolver(() => InvoiceModel)
export class InvoicesResolver {
	constructor(private readonly invoicesService: InvoicesService) {}

	@Query(() => [InvoiceModel])
	async invoices(@CurrentUser() user: User): Promise<InvoiceModel[]> {
		return this.invoicesService.getAllInvoices(user.id);
	}

	@Query(() => InvoiceModel)
	async invoice(
		@Args("id") id: string,
		@CurrentUser() user: User,
	): Promise<InvoiceModel> {
		return this.invoicesService.getInvoiceById(id, user.id);
	}

	@Query(() => [InvoiceModel])
	async invoicesByClient(
		@Args("clientId") clientId: string,
		@CurrentUser() user: User,
	): Promise<InvoiceModel[]> {
		return this.invoicesService.getInvoicesByClientId(clientId, user.id);
	}

	@Mutation(() => InvoiceModel)
	async createInvoice(
		@Args("input") input: CreateInvoiceInput,
		@CurrentUser() user: User,
	): Promise<InvoiceModel> {
		return this.invoicesService.createInvoice(input, user.id);
	}

	@Mutation(() => InvoiceModel)
	async updateInvoice(
		@Args("id") id: string,
		@Args("input") input: UpdateInvoiceInput,
		@CurrentUser() user: User,
	): Promise<InvoiceModel> {
		return this.invoicesService.updateInvoice(id, input, user.id);
	}
}
