import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Handle connection errors
prisma.$on('error', (e) => {
  console.error('❌ Prisma error:', e);
});

// Handle graceful shutdown
process.on('beforeExit', async () => {
  console.log('🔄 Closing Prisma connection...');
  await prisma.$disconnect();
});

// Test connection on startup
prisma.$connect()
  .then(() => {
    console.log('✅ Prisma connected to database');
  })
  .catch((error) => {
    console.error('❌ Prisma connection failed:', error);
  });

export default prisma;