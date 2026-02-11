// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'test@test.com';
  const adminPassword = 'test@123';

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (existingAdmin) {
    console.log('Admin user already exists.');
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

// prisma/seed.ts 
await prisma.user.create({
  data: {
    email: adminEmail,
    password: hashedPassword,
    role: 'ADMIN',
  },
});
  console.log('Admin user created successfully.');
}

main().catch(console.error).finally(() => prisma.$disconnect());