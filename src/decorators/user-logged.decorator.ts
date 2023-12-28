import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserLogged = createParamDecorator((_, context: ExecutionContext) => {
    const user = context.switchToHttp().getRequest().user;
    return user;
})