import { Global, Module } from "@nestjs/common";
import { ClsModule } from "nestjs-cls";
import { PrismaTenancyService } from "./prisma-tenancy.service";

@Global()
@Module({
	imports: [ClsModule],
	providers: [PrismaTenancyService],
	exports: [PrismaTenancyService],
})
export class PrismaTenancyModule {}
