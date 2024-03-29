import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from './service/prisma.service';
import { JwtStrategy } from './strategy/jwt.strategy';
const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
    imports: [
        PassportModule,
        JwtModule.register({ secret: 'l929T2k0BR' }),
    ],
    providers: [AuthService, PrismaService, JwtStrategy],
    controllers: [AuthController],
    exports: [passportModule]
})
export class AuthModule { }