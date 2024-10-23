import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Xử lý dữ liệu trước khi truyền qua controller/handler
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
      })),
    );
  }
}
