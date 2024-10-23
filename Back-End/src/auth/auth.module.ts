import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import KeyJWT from "./KeyJWT";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: KeyJWT,
            signOptions: {expiresIn: '7d'},
        })
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, PassportModule]
})
export class AuthModule {
}
