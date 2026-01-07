// backend/models/index.js
import { Sequelize, Op } from 'sequelize';
import config from '../config/db.js';

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

// Import all models
import userModel from './users.js';
import jobApplicationModel from './JobApplication.js';
import contactModel from './Contact.js';
import blogPostModel from './BlogPost.js';
import portfolioModel from './Portfolio.js';
import testimonialModel from './Testimonial.js';
import serviceModel from './Service.js';
import hostingPlanModel from './HostingPlan.js';
import subscriptionModel from './Subscription.js';

// Initialize models
const User = userModel(sequelize, Sequelize.DataTypes);
const JobApplication = jobApplicationModel(sequelize, Sequelize.DataTypes);
const Contact = contactModel(sequelize, Sequelize.DataTypes);
const BlogPost = blogPostModel(sequelize, Sequelize.DataTypes);
const Portfolio = portfolioModel(sequelize, Sequelize.DataTypes);
const Testimonial = testimonialModel(sequelize, Sequelize.DataTypes);
const Service = serviceModel(sequelize, Sequelize.DataTypes);
const HostingPlan = hostingPlanModel(sequelize, Sequelize.DataTypes);
const Subscription = subscriptionModel(sequelize, Sequelize.DataTypes);

// Store all models in an object
const models = {
  User,
  JobApplication,
  Contact,
  BlogPost,
  Portfolio,
  Testimonial,
  Service,
  HostingPlan,
  Subscription,
};

// Define associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Export everything
export {
  sequelize,
  Sequelize,
  Op,
  User,
  JobApplication,
  Contact,
  BlogPost,
  Portfolio,
  Testimonial,
  Service,
  HostingPlan,
  Subscription,
  models,
};