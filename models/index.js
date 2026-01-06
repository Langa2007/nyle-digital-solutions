// models/index.js
import { Sequelize } from 'sequelize';
import config from '../config/database.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

let sequelize;
if (env === 'production' && dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], {
    ...dbConfig,
    logging: dbConfig.logging ? console.log : false,
  });
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      logging: dbConfig.logging ? console.log : false,
      pool: dbConfig.pool,
    }
  );
}

// Import models
import User from './User.js';
import JobApplication from './JobApplication.js';
import Contact from './Contact.js';
import BlogPost from './BlogPost.js';
import Portfolio from './Portfolio.js';
import Testimonial from './Testimonial.js';
import Service from './Service.js';
import HostingPlan from './HostingPlan.js';
import Subscription from './Subscription.js';

// Initialize models
const models = {
  User: User(sequelize, Sequelize.DataTypes),
  JobApplication: JobApplication(sequelize, Sequelize.DataTypes),
  Contact: Contact(sequelize, Sequelize.DataTypes),
  BlogPost: BlogPost(sequelize, Sequelize.DataTypes),
  Portfolio: Portfolio(sequelize, Sequelize.DataTypes),
  Testimonial: Testimonial(sequelize, Sequelize.DataTypes),
  Service: Service(sequelize, Sequelize.DataTypes),
  HostingPlan: HostingPlan(sequelize, Sequelize.DataTypes),
  Subscription: Subscription(sequelize, Sequelize.DataTypes),
};

// Define associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize, models };