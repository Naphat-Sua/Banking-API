import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;
    
    if (authorizationHeader) {
      const encodedCredentials = authorizationHeader.split(' ')[1]; // Lấy phần mã hóa base64
      const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
      const [username, apiKey] = decodedCredentials.split(':');
      
      // Lưu 'username' và 'apiKey' vào request để sử dụng ở các bước tiếp theo
      request.username = username;
      request.apiKey = apiKey;
    }
    
    return next.handle();
  }
}
