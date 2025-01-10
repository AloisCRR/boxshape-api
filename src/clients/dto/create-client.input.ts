import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, MaxLength } from "class-validator";

@InputType()
export class CreateClientInput {
	@Field()
	@MaxLength(25)
	name: string;

	@Field()
	@IsEmail()
	email: string;

	@Field({ nullable: true })
	phone?: string;

	@Field({ nullable: true })
	address?: string;
}
