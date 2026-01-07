// backend/models/Subscription.js
export default (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    planId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'hosting_plans',
        key: 'id',
      },
    },
    stripeSubscriptionId: {
      type: DataTypes.STRING,
      unique: true,
    },
    stripeCustomerId: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('active', 'past_due', 'canceled', 'unpaid', 'trialing'),
      defaultValue: 'active',
    },
    currentPeriodStart: {
      type: DataTypes.DATE,
    },
    currentPeriodEnd: {
      type: DataTypes.DATE,
    },
    canceledAt: {
      type: DataTypes.DATE,
    },
    cancelAtPeriodEnd: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    trialStart: {
      type: DataTypes.DATE,
    },
    trialEnd: {
      type: DataTypes.DATE,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      comment: 'Amount in smallest currency unit',
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'usd',
    },
    interval: {
      type: DataTypes.STRING,
      comment: 'month, year, etc.',
    },
    billingCycleAnchor: {
      type: DataTypes.DATE,
    },
    metadata: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    paymentMethodId: {
      type: DataTypes.STRING,
    },
    invoices: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
  }, {
    timestamps: true,
    tableName: 'subscriptions',
    indexes: [
      {
        fields: ['userId'],
      },
      {
        fields: ['planId'],
      },
      {
        fields: ['status'],
      },
      {
        fields: ['stripeSubscriptionId'],
        unique: true,
      },
      {
        fields: ['currentPeriodEnd'],
      },
    ],
  });

  Subscription.associate = (models) => {
    Subscription.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Subscription.belongsTo(models.HostingPlan, {
      foreignKey: 'planId',
      as: 'plan',
    });
  };

  return Subscription;
};