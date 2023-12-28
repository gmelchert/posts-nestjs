import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class AuthPayloadValidatorMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { login, password } = req.body;
        if (!login || !password) throw new BadRequestException({
            success: false,
            error: 'Bad request.',
            message: 'Missing properties on Body.',
        });

        next();
    }
}