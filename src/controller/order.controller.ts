import { Controller, Post, Delete, Get, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }
    
    @UseGuards(AuthGuard("jwt"))
    @Post()
    createOrder(
        @Body('customerId') customerId: number,
        @Body('bookId') bookId: number,
        @Body('quantity') quantity: number
    ) {
        return this.orderService.createOrder(customerId, bookId, quantity);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get()
    getAllOrders() {
        return this.orderService.getAllOrders();
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete(':id/cancel')
    cancelOrder(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.cancelOrder(id);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get(':customerId')
    getOrders(@Param('customerId') customerId: number) {
        return this.orderService.getOrders(customerId);
    }
}