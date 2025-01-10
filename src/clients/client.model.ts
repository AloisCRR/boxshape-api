import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ClientEntity } from "./client.entity";

@ObjectType({ description: "Client of the business" })
export class Client implements ClientEntity {
	@Field((type) => ID)
	id: string;

	@Field()
	name: string;

	@Field()
	email: string;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}
