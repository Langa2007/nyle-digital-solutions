// script/create-admin.js
import bcrypt from 'bcryptjs';
import { sequelize, User } from '../models/index.js';

async function createAdminUser() {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Stephanie@2007', salt);

    // Create admin user
    const adminUser = await User.create({
      email: 'fidellanga67@gmail.com',
      password: hashedPassword,
      firstName: 'Fidel',
      lastName: 'Langa',
      role: 'admin',
      company: 'Nyle Digital Solutions',
      isEmailVerified: true,
      status: 'active',
    });

    console.log('✅ Admin user created successfully:');
    console.log('📧 Email:', adminUser.email);
    console.log('🔑 Password: Stephanie@2007');
    console.log('👤 Role:', adminUser.role);
    console.log('⚠️  Change this password immediately after first login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    
    // If user already exists
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.log('\nℹ️  Admin user already exists. You can:');
      console.log('1. Reset password in database');
      console.log('2. Delete existing user and run again');
    }
    
    process.exit(1);
  }
}

createAdminUser();