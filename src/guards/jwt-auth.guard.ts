import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const canActivate = await super.canActivate(context);
        if (canActivate) {
            const request = context.switchToHttp().getRequest();
            request.user = request.user || {};

            console.log('User ID:', request.user.id); // Access the user's ID with request.user.sub

            // console.log('request:', request); // Add this line
            console.log('User:', request.user); // Add this line
        }
        return Promise.resolve(!!canActivate);
    }
}