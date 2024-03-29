import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './service/auth.service';
import { PrismaService } from './service/prisma.service';
import { User } from '@prisma/client';
const mockUser: User = {
    id: 1,
    username: 'test',
    password: 'test',
};
describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: PrismaService,
                    useValue: {
                        user: {
                            findUnique: jest.fn().mockResolvedValue(mockUser),
                        },
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // Add more tests here
});