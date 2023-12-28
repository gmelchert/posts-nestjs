import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class GlobalInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();

        return next.handle().pipe(tap(() => {
            console.log(`Global Interceptor: ${request.url} - ${request.method}`);
        }));
    }
}