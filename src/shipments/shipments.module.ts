import { Module } from "@nestjs/common";
import { ShipmentsRepository } from "./shipments.repository";
import { ShipmentsResolver } from "./shipments.resolver";
import { ShipmentsService } from "./shipments.service";

@Module({
	providers: [
		ShipmentsService,
		ShipmentsResolver,
		{
			provide: "IShipmentsRepository",
			useClass: ShipmentsRepository,
		},
	],
})
export class ShipmentsModule {}
