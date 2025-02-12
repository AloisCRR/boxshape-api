import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "node:path";
import { AuthModule } from "./auth/auth.module";
import { ClerkAuthGuard } from "./auth/clerk-auth.guard";
import { ClerkClientProvider } from "./auth/clerk-client.provider";
import { ClientsModule } from "./clients/clients.module";
import { PrismaTenancyModule } from "./common/prisma/prisma-tenancy.module";
import { InvoiceItemsModule } from "./invoice-items/invoice-items.module";
import { InvoicesModule } from "./invoices/invoices.module";
import { ShipmentsModule } from "./shipments/shipments.module";
import { WebhookModule } from "./webhook/webhook.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), "src/schema.gql"),
		}),
		AuthModule,
		WebhookModule,
		PrismaTenancyModule,
		ClientsModule,
		InvoicesModule,
		InvoiceItemsModule,
		ShipmentsModule,
	],
	controllers: [],
	providers: [
		ClerkClientProvider,
		{
			provide: APP_GUARD,
			useClass: ClerkAuthGuard,
		},
	],
})
export class AppModule {}
