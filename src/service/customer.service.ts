import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateCustomerDto } from 'src/dto/create-customer.dto';

@Injectable()
export class CustomerService {
    constructor(private prisma: PrismaService) { }
    async getCustomerByUserId(userId: number) {
        // Fetch the customer record associated with the given user ID
        const customer = await this.prisma.customer.findFirst({
            where: { userId: userId },
        });

        if (!customer) {
            throw new NotFoundException(`Customer not found for user ID ${userId}`);
        }

        return customer;
    }
    async createCustomer(userId: number, createCustomerDto: CreateCustomerDto) {
        console.log('User ID:', userId); // Change userId to id

        const customer = await this.prisma.customer.create({
            data: {
                ...createCustomerDto,
                userId: userId, // Change userId to id
                points: 100,
            },
        });

        return customer;
    }
    async deleteCustomer(id: number) {
        return this.prisma.customer.delete({
            where: { id: id },
        });
    }
    async getCustomers() {
        return this.prisma.customer.findMany();
    }
}