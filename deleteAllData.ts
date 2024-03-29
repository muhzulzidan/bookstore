import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.book.deleteMany();
    await prisma.user.deleteMany();
    await prisma.order.deleteMany();
    await prisma.customer.deleteMany();
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    });