// backend/models/HostingPlan.js
export default (sequelize, DataTypes) => {
  const HostingPlan = sequelize.define('HostingPlan', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    billingCycle: {
      type: DataTypes.ENUM('monthly', 'yearly', 'quarterly'),
      defaultValue: 'monthly',
    },
    features: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    specs: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: 'Technical specifications like RAM, CPU, Storage',
    },
    stripePriceId: {
      type: DataTypes.STRING,
    },
    stripeProductId: {
      type: DataTypes.STRING,
    },
    popular: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    discountPercentage: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
      },
    },
    maxUsers: {
      type: DataTypes.INTEGER,
    },
    maxProjects: {
      type: DataTypes.INTEGER,
    },
    supportLevel: {
      type: DataTypes.ENUM('basic', 'standard', 'premium', 'enterprise'),
      defaultValue: 'standard',
    },
  }, {
    timestamps: true,
    tableName: 'hosting_plans',
    indexes: [
      {
        fields: ['slug'],
        unique: true,
      },
      {
        fields: ['active'],
      },
      {
        fields: ['popular'],
      },
      {
        fields: ['price'],
      },
    ],
  });

  HostingPlan.associate = (models) => {
    HostingPlan.hasMany(models.Subscription, {
      foreignKey: 'planId',
      as: 'subscriptions',
    });
  };

  return HostingPlan;
};