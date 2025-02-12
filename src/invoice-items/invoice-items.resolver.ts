import { User } from "@clerk/backend";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { CreateInvoiceItemInput } from "./dto/create-invoice-item.input";
import { UpdateInvoiceItemInput } from "./dto/update-invoice-item.input";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceItemsService } from "./invoice-items.service";

@Resolver(() => InvoiceItemModel)
export class InvoiceItemsResolver {
	constructor(private readonly invoiceItemsService: InvoiceItemsService) {}

	@Mutation(() => InvoiceItemModel)
	async createInvoiceItem(
		@Args("input") input: CreateInvoiceItemInput,
		@CurrentUser() user: User,
	) {
		return this.invoiceItemsService.createInvoiceItem(input, user.id);
	}

	@Mutation(() => InvoiceItemModel)
	async updateInvoiceItem(
		@Args("id", { type: () => ID }) id: string,
		@Args("input") input: UpdateInvoiceItemInput,
		@CurrentUser() user: User,
	) {
		return this.invoiceItemsService.updateInvoiceItem(id, input, user.id);
	}

	@Query(() => [InvoiceItemModel])
	async invoiceItems(
		@Args("invoiceNumber") invoiceNumber: string,
		@CurrentUser() user: User,
	) {
		return this.invoiceItemsService.getInvoiceItems(invoiceNumber, user.id);
	}

	@Query(() => [InvoiceItemModel])
	async invoiceItemsWithShipment(
		@Args("invoiceNumber") invoiceNumber: string,
		@CurrentUser() user: User,
	) {
		return this.invoiceItemsService.getInvoiceItemsWithShipment(
			invoiceNumber,
			user.id,
		);
	}
}
