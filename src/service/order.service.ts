import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) { }

    async createOrder(customerId: number, bookId: number, quantity: number) {
        const book = await this.prisma.book.findUnique({ where: { id: bookId } });
        const customer = await this.prisma.customer.findUnique({ where: { id: customerId } });
        const totalPoints = book.price * quantity;

        if (customer.points < totalPoints) {
            throw new Error('Not enough points');
        }

        await this.prisma.customer.update({
            where: { id: customerId },
            data: { points: customer.points - totalPoints },
        });

        return this.prisma.order.create({
            data: {
                customerId: customerId,
                bookId: bookId,
            },
        });
    }
    async getAllOrders() {
        return this.prisma.order.findMany();
    }
    async cancelOrder(id: number) {
        const order = await this.prisma.order.findUnique({ where: { id: id } });
        const book = await this.prisma.book.findUnique({ where: { id: order.bookId } });

        // Refund points to customer
        await this.prisma.customer.update({
            where: { id: order.customerId },
            data: { points: { increment: book.price } },
        });

        // Delete order
        return this.prisma.order.delete({ where: { id: id } });
    }

    async getOrders(customerId: number) {
        return this.prisma.order.findMany({
            where: { customerId: Number(customerId) },
        });
    }
}