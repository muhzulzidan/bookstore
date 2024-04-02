import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { AuthController } from './controller/auth.controller';
import { PrismaService } from './service/prisma.service';
import { BookController } from './controller/book.controller';
import { BookService } from './service/book.service';
import { OrderController } from './controller/order.controller';
import { AuthService } from './service/auth.service';
import { OrderService } from './service/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { CustomerController } from './controller/customer.controller';
import { CustomerService } from './service/customer.service';

// Import your other controllers and services here

@Module({
  imports: [
    PassportModule,
    AuthModule,
    JwtModule.register({ secret: 'l929T2k0BR' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.Host,
      port: Number(process.env.Port),
      username: process.env.User,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.database,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AuthController, OrderController, BookController, AppController, CustomerController, OrderController,], 
  providers: [AppService, PrismaService, AuthService, OrderService, BookService, LocalStrategy, JwtStrategy, CustomerService, OrderService ],
})
export class AppModule {}
