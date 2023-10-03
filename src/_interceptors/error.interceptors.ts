import {
    CallHandler,
    ExecutionContext,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

export class ErrorInterceptor implements NestInterceptor {
    private readonly logger: Logger = new Logger(ErrorInterceptor.name);

    intercept(
        _context: ExecutionContext,
        next: CallHandler,
    ): Observable<Error> {
        return next.handle().pipe(
            catchError((err) => {
                this.logger.debug(
                    `${err.name}: ${err.message} [${err.status}]`,
                );

                return throwError(() => err);
            }),
        );
    }
}
