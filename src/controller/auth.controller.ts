import { Controller, UseGuards, Post, Request, Body, UnauthorizedException, Logger, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';


@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  private readonly logger = new Logger(AuthController.name);

  @Post('signup')
  async signup(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.signup(username, password);
  }
  // @UseGuards(AuthGuard('jwt'))
  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    this.logger.log(`Login attempt for username: ${username}`);
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      this.logger.error(`Invalid credentials for username: ${username}`);
      throw new UnauthorizedException();
    }
    this.logger.log(`Successful login for username: ${username}`);
    this.logger.log(`Successful login for user: ${JSON.stringify(user)}`);
    return this.authService.login(user);
  }
  @Delete('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Request() req) {
    // Log the logout action
    this.logger.log(`Logout for user: ${req.user.username}`);

    // In a real-world application, you might do something here like
    // invalidate the user's session or token on the server side.
    // However, with JWTs, this is typically handled on the client side
    // by simply deleting the token.

    // This endpoint is mainly for logging purposes.
  }
}