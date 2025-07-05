#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 StayNest Setup Test\n');

// Check Node.js version
try {
  const nodeVersion = process.version;
  console.log(`✅ Node.js version: ${nodeVersion}`);
  
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion < 16) {
    console.log('❌ Node.js version 16 or higher is required');
    process.exit(1);
  }
} catch (error) {
  console.log('❌ Could not check Node.js version');
}

// Check if directories exist
const directories = ['api', 'client', 'socket'];
directories.forEach(dir => {
  if (existsSync(join(__dirname, dir))) {
    console.log(`✅ ${dir} directory exists`);
  } else {
    console.log(`❌ ${dir} directory missing`);
  }
});

// Check package.json files
directories.forEach(dir => {
  const packagePath = join(__dirname, dir, 'package.json');
  if (existsSync(packagePath)) {
    try {
      const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
      console.log(`✅ ${dir}/package.json is valid`);
    } catch (error) {
      console.log(`❌ ${dir}/package.json is invalid: ${error.message}`);
    }
  } else {
    console.log(`❌ ${dir}/package.json missing`);
  }
});

// Check environment files
const envFiles = [
  { path: 'api/.env', example: 'api/env.example' },
  { path: 'socket/.env', example: 'socket/env.example' },
  { path: 'client/.env', example: 'client/env.example' }
];

envFiles.forEach(({ path, example }) => {
  if (existsSync(join(__dirname, path))) {
    console.log(`✅ ${path} exists`);
  } else if (existsSync(join(__dirname, example))) {
    console.log(`⚠️  ${path} missing (copy from ${example})`);
  } else {
    console.log(`❌ ${path} and ${example} missing`);
  }
});

// Check Prisma schema
const prismaSchema = join(__dirname, 'api', 'prisma', 'schema.prisma');
if (existsSync(prismaSchema)) {
  console.log('✅ Prisma schema exists');
} else {
  console.log('❌ Prisma schema missing');
}

console.log('\n📋 Next Steps:');
console.log('1. Copy env.example files to .env in each directory');
console.log('2. Set up your MongoDB database');
console.log('3. Update environment variables with your values');
console.log('4. Run: cd api && npx prisma generate');
console.log('5. Run: cd api && npx prisma db push');
console.log('6. Start servers: npm run dev (in each directory)');

console.log('\n🌐 For deployment:');
console.log('- API & Socket: Deploy to Render');
console.log('- Client: Deploy to Vercel');
console.log('- Update environment variables with production URLs'); 