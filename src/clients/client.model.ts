import { ClientEntity } from "@/clients/client.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "Client of the business" })
export class ClientModel implements ClientEntity {
	@Field((type) => ID)
	id: string;

	@Field()
	name: string;

	@Field()
	email: string;

	@Field({ nullable: true })
	phone?: string;

	@Field({ nullable: true })
	address?: string;

	@Field()
	created: Date;

	@Field()
	updated: Date;
}
