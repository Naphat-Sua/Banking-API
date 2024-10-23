import {CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';

export class IpGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const forwardedIp = request.headers['x-forwarded-for'];
        const requestIp = forwardedIp ? forwardedIp.indexOf(',') >= 0 ? forwardedIp.split(',')[0] : forwardedIp : request.ip


        // if (!request.user || (request.user && request.user.ip !== requestIp)) {
        //     throw new UnauthorizedException();
        // }
        //
        if (request.user && (request.user.role !== 'admin' && request.user.role !== 'manager' && request.user.role !== 'operation')) {
            throw new UnauthorizedException()
        }

        return true;
    }
}
