import { Module } from "@nestjs/common";
import { InvoiceRepository } from "./invoice.repository";
import { InvoicesResolver } from "./invoices.resolver";
import { InvoicesService } from "./invoices.service";

@Module({
	providers: [
		InvoicesResolver,
		InvoicesService,
		{
			provide: "IInvoicesRepository",
			useClass: InvoiceRepository,
		},
	],
})
export class InvoicesModule {}
