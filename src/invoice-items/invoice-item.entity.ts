export class InvoiceItemEntity {
	id: string;
	invoiceNumber: string;
	amount: number;
	trackingCode: string;
	description?: string | null;
	shipmentId: string;
}
