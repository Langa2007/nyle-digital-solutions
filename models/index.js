// backend/models/index.js
import dotenv from 'dotenv';
import { Sequelize, Op } from 'sequelize';

import userModel from './users.js';
import jobApplicationModel from './JobApplication.js';
import contactModel from './contact.js';
import blogPostModel from './BlogPost.js';
import portfolioModel from './Portfolio.js';
import testimonialModel from './Testimonial.js';
import serviceModel from './Service.js';
import hostingPlanModel from './HostingPlan.js';
import subscriptionModel from './Subscription.js';

dotenv.config();

/* ===========================
   Database (Neon FIRST)
=========================== */

const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(
  DATABASE_URL || 'postgres://localhost:5432/nyle_dev',
  {
    dialect: 'postgres',
    logging: false,
    dialectOptions: DATABASE_URL
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

/* ===========================
   Models
=========================== */

const User = userModel(sequelize, Sequelize.DataTypes);
const JobApplication = jobApplicationModel(sequelize, Sequelize.DataTypes);
const Contact = contactModel(sequelize, Sequelize.DataTypes);
const BlogPost = blogPostModel(sequelize, Sequelize.DataTypes);
const Portfolio = portfolioModel(sequelize, Sequelize.DataTypes);
const Testimonial = testimonialModel(sequelize, Sequelize.DataTypes);
const Service = serviceModel(sequelize, Sequelize.DataTypes);
const HostingPlan = hostingPlanModel(sequelize, Sequelize.DataTypes);
const Subscription = subscriptionModel(sequelize, Sequelize.DataTypes);

/* ===========================
   Registry
=========================== */

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

/* ===========================
   Associations
=========================== */

Object.values(models).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

/* ===========================
   Exports
=========================== */

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

export default sequelize;
