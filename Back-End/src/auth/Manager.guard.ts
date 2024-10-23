import {CanActivate, ExecutionContext, Logger, UnauthorizedException} from "@nestjs/common";

export class ManagerGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        if (request.user && request.user.role !== 'manager') {
            throw new UnauthorizedException()
        }
        const forwardedIp = request.headers['x-forwarded-for'];
        const requestIp = forwardedIp ? forwardedIp.indexOf(',') >= 0 ? forwardedIp.split(',')[0] : forwardedIp : request.ip
        // if (!request.user || (request.user && request.user.ip !== requestIp)) {
        //     throw new UnauthorizedException();
        // }

        return true;
    }
}
