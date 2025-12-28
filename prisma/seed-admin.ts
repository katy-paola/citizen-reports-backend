import 'dotenv/config';
import { prisma } from './prisma-client';
import * as bcrypt from 'bcrypt';

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@local.com' },
    update: {},
    create: {
      email: 'admin@local.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
