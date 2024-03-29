import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { BookService } from '../service/book.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) { }
    @Post('generateMockData')
    async generateMockData() {
        const tags = ["fiction", "non-fiction", "science", "essay"];
        const books = [];

        for (let i = 0; i < tags.length; i++) {
            for (let j = 0; j < 3; j++) {
                const book = {
                    "title": `Book Title ${i * 3 + j + 1}`,
                    "writer": `Book Writer ${i * 3 + j + 1}`,
                    "coverImage": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
                    "price": 19.99,
                    "tags": [tags[i]]
                };
                books.push(book);
            }
        }

        for (const book of books) {
            await this.bookService.create(book);
        }

        return { message: 'Mock data generated successfully' };
    }
    @UseGuards(AuthGuard("jwt"))
    @Post()
    async create(
        @Body('title') title: string,
        @Body('writer') writer: string,
        @Body('coverImage') coverImage: string,
        @Body('price') price: number,
        @Body('tags') tags: string[],
    ) {
        return this.bookService.create({ title, writer, coverImage, price, tags });
    }
    @UseGuards(AuthGuard("jwt"))
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body('title') title: string,
        @Body('writer') writer: string,
        @Body('coverImage') coverImage: string,
        @Body('price') price: number,
        @Body('tags') tags: string[],
    ) {
        return this.bookService.update(id, { title, writer, coverImage, price, tags });
    }
    @UseGuards(AuthGuard("jwt"))
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.bookService.delete(id);
    }
    @Get()
    getBooks() {
        return this.bookService.getBooks();
    }
}