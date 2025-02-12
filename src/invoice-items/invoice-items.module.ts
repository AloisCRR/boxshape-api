import { Module } from "@nestjs/common";
import { InvoiceItemsRepository } from "./invoice-items.repository";
import { InvoiceItemsResolver } from "./invoice-items.resolver";
import { InvoiceItemsService } from "./invoice-items.service";

@Module({
	providers: [
		InvoiceItemsService,
		InvoiceItemsResolver,
		{
			provide: "IInvoiceItemsRepository",
			useClass: InvoiceItemsRepository,
		},
	],
})
export class InvoiceItemsModule {}
