import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();

async function seed() {
  const email = 'admin@test.com';
  const password = 'admin123';

  try {
    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      console.log('Admin already exists:', email);
      return;
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.admin.create({
      data: {
        name: 'Primary Admin',
        email,
        password: hashed,
        role: 'admin',
      },
    });

    console.log('✅ Admin created:', email, 'password:', password);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

seed();
