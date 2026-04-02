import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize, User } from '../models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const requiredVars = ['ADMIN_FIRST_NAME', 'ADMIN_LAST_NAME', 'ADMIN_EMAIL', 'ADMIN_PASSWORD', 'ADMIN_COMPANY'].filter(
  (key) => !process.env[key]
);

if (requiredVars.length) {
  console.error(`Missing required env vars: ${requiredVars.join(', ')}`);
  process.exit(1);
}

async function createAdminUser() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    const existingUser = await User.findOne({ where: { email: process.env.ADMIN_EMAIL } });
    if (existingUser) {
      console.log(`Admin user with email ${process.env.ADMIN_EMAIL} already exists.`);
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

    const adminUser = await User.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      firstName: process.env.ADMIN_FIRST_NAME,
      lastName: process.env.ADMIN_LAST_NAME,
      role: 'admin',
      company: process.env.ADMIN_COMPANY,
      isEmailVerified: true,
      status: 'active',
    });

    console.log('Admin user created successfully.');
    console.log(`Email: ${adminUser.email}`);
    console.log(`Role: ${adminUser.role}`);
  } catch (error) {
    console.error('Error creating admin user:', error.message);
    process.exit(1);
  }
}

createAdminUser();
