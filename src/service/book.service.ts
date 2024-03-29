import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Book } from '@prisma/client';

type CreateBookDto = Omit<Book, 'id'>;

@Injectable()
export class BookService {
    constructor(private prisma: PrismaService) { }
    async create(book: CreateBookDto): Promise<Book> {
        return this.prisma.book.create({
            data: book,
        });
    }
    async update(id: number, data) {
        return this.prisma.book.update({
            where: { id: Number(id) },
            data,
        });
    }
    async delete(id: number) {
        return this.prisma.book.delete({
            where: { id: Number(id) },
        });
    }
    async getBooks() {
        return this.prisma.book.findMany();
    }
}