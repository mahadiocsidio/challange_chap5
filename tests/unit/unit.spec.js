const {PrismaClient}= require('@prisma/client')
const prisma = new PrismaClient()

describe('Format all records', () => {
  beforeAll(async () => {
    await prisma.transactions.deleteMany();
    await prisma.bank_Accounts.deleteMany();
    await prisma.profiles.deleteMany();
    await prisma.users.deleteMany();
  });
  test('should first', () => {
    expect(1).toBe(1);
  });
});