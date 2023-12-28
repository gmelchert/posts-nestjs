import { ExecutionContext, createParamDecorator } from "@nestjs/common";

type ParamAuthDecoratorData = 'signIn' | 'signOn';

export const ParamAuth = createParamDecorator((data: ParamAuthDecoratorData, context: ExecutionContext) => {
    const body = context.switchToHttp().getRequest().body;
    
    if (data === 'signIn') {
        const { login, password } = body;
        return { login, password };
    } else if (data === 'signOn') {
        const { name, password, email } = body;
        return { name, password, email };
    }
});