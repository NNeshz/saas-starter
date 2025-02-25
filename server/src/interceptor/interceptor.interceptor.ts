import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.url;
        const now = Date.now();

        return next
            .handle()
            .pipe(
                tap((data) => {
                    const response = context.switchToHttp().getResponse();
                    const statusCode = response.statusCode;
                    const delay = Date.now() - now;

                    console.log(`[${method}] ${url} - Status: ${statusCode} - ${delay}ms`);
                }),
            );
    }
}