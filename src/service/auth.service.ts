import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }
    async signup(username: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
        return user;
    }
    async login(user: User) {
        const payload = { username: user.username, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(username: string, password: string): Promise<any> {
        console.log(`Validating user with username validate user: ${username}`);
        const user = await this.prisma.user.findUnique({ where: { username } });

        if (user) {
            const passwordMatches = await bcrypt.compare(password, user.password);
            console.log(`Password matches for username: ${username}: ${passwordMatches}`);
            if (passwordMatches) {
                const { password, ...result } = user;
                return result;
            }
        } else {
            console.log(`No user found with username: ${username}`);
        }

        return null;
    }
}