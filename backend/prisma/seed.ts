import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.upsert({
    where: {
      email: 'gabriel@taskflow.com',
    },
    update: {},
    create: {
      name: 'Gabriel Domingos',
      email: 'gabriel@taskflow.com',
    },
  });

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Frontend' },
      update: {},
      create: { name: 'Frontend' },
    }),
    prisma.category.upsert({
      where: { name: 'Backend' },
      update: {},
      create: { name: 'Backend' },
    }),
    prisma.category.upsert({
      where: { name: 'Documentação' },
      update: {},
      create: { name: 'Documentação' },
    }),
    prisma.category.upsert({
      where: { name: 'Setup' },
      update: {},
      create: { name: 'Setup' },
    }),
  ]);

  console.log({ user, categories });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
