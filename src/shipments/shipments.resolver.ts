import { User } from "@clerk/backend";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { CreateShipmentInput } from "./dto/create-shipment.input";
import { UpdateShipmentInput } from "./dto/update-shipment.input";
import { ShipmentModel } from "./shipment.model";
import { ShipmentsService } from "./shipments.service";

@Resolver(() => ShipmentModel)
export class ShipmentsResolver {
	constructor(private readonly shipmentsService: ShipmentsService) {}

	@Mutation(() => ShipmentModel)
	async createShipment(
		@Args("input") input: CreateShipmentInput,
		@CurrentUser() user: User,
	) {
		return this.shipmentsService.createShipment(input, user.id);
	}

	@Mutation(() => ShipmentModel)
	async updateShipment(
		@Args("id", { type: () => ID }) id: string,
		@Args("input") input: UpdateShipmentInput,
		@CurrentUser() user: User,
	) {
		return this.shipmentsService.updateShipment(id, input, user.id);
	}

	@Query(() => [ShipmentModel])
	async shipments(@CurrentUser() user: User) {
		return this.shipmentsService.getShipments(user.id);
	}

	@Query(() => ShipmentModel)
	async shipment(
		@Args("id", { type: () => ID }) id: string,
		@CurrentUser() user: User,
	) {
		return this.shipmentsService.getShipmentById(id, user.id);
	}

	@Query(() => [ShipmentModel])
	async shipmentsWithClient(@CurrentUser() user: User) {
		return this.shipmentsService.getShipmentsWithClient(user.id);
	}

	@Query(() => [ShipmentModel])
	async shipmentsOfClient(
		@Args("clientId", { type: () => ID }) clientId: string,
		@CurrentUser() user: User,
	) {
		return this.shipmentsService.getShipmentsOfClient(clientId, user.id);
	}
}
