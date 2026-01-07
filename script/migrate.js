// backend/scripts/migrate.js
import { sequelize } from '../models/index.js';

async function migrate() {
  try {
    console.log('Running database migration...');

    // Disable logging JUST for this operation
    await sequelize.sync({
      alter: true,
      logging: false,
    });

    console.log('Database migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
}

migrate();
