import { Controller, ForbiddenException, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ParamAuth, Public } from "src/decorators";
import { SignInDto, SignOnDto } from "./dto";
import { Ok } from "src/shared";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('sign-in')
    async signIn(@ParamAuth('signIn') { login, password }: SignInDto) {
        const user = await this.authService.findUser({ name: undefined, password, email: login });
        if (!user) throw new UnauthorizedException({
            success: false,
            error: 'Unauthorized.',
            message: 'Wrong credentials.',
        });

        const accessToken = await this.authService.signIn(user);
        const message = 'Login done with success.';

        delete user.password;

        return new Ok({ message, data: { user, accessToken } });
    }

    @Public()
    @Post('sign-on')
    async signOn(@ParamAuth('signOn') body: SignOnDto) {
        const { email } = body;
        const userExists = await this.authService.findUser({ email, name: undefined, password: undefined });
        
        if (userExists) throw new ForbiddenException({
            success: false,
            error: 'Forbidden.',
            message: 'Email already in use.',
        });

        const { accessToken, user } = await this.authService.signOn(body);
        const message = 'User created with success.';

        return new Ok({ message, data: { user, accessToken } });
    }
}