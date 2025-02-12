import { InputType, PartialType } from "@nestjs/graphql";
import { CreateShipmentInput } from "./create-shipment.input";

@InputType()
export class UpdateShipmentInput extends PartialType(CreateShipmentInput) {}
