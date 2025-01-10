import { User } from "@clerk/backend";
import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator(
	(_: unknown, context: ExecutionContext): User => {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req.user;
	},
);
