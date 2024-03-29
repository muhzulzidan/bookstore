import { Body, Controller, Delete, Get, Param, Post, UseGuards, Request, Req } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

interface RequestWithUser extends Request {
    user: {
        id: number;
        // Add other properties of the user object if needed
    };
}

@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Req() req: RequestWithUser) {
        // The user object is attached to the request by the authentication middleware
        const user = req.user;

        console.log('User ID:', user.id); // Add this line

        const customer = await this.customerService.getCustomerByUserId(user.id);

        console.log('Customer:', customer); // Add this line

        // Return the user and customer information
        return {
            userId: user.id,
            customerId: customer.id,
            customer: customer,
        };
    }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async createCustomer(@Req() req: RequestWithUser, @Body() createCustomerDto: CreateCustomerDto) {
        // Get the user object from the request
        const user = req.user;

        console.log('User ID:', user.id); // Change userId to id

        // Pass the user ID to the service
        return this.customerService.createCustomer(user.id, createCustomerDto); // Change userId to id
    }

    @UseGuards(JwtAuthGuard)

    @Delete(':id')
    deleteCustomer(@Param('id') id: number) {
        return this.customerService.deleteCustomer(id);
    }
    
    @Get()
    getCustomers() {
        return this.customerService.getCustomers();
    }
}