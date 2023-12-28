import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const ParamId = createParamDecorator((_, context: ExecutionContext): number => {
    const id = Number(context.switchToHttp().getRequest().params.id);
    return id;
});