// backend/models/Service.js
export default (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
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
      allowNull: false,
    },
    detailedDescription: {
      type: DataTypes.TEXT,
    },
    icon: {
      type: DataTypes.STRING,
    },
    features: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    technologies: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    pricingModel: {
      type: DataTypes.ENUM('hourly', 'fixed', 'subscription', 'custom'),
      defaultValue: 'custom',
    },
    startingPrice: {
      type: DataTypes.DECIMAL(10, 2),
    },
    deliveryTime: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.ENUM(
        'development',
        'design',
        'consulting',
        'infrastructure',
        'support'
      ),
      defaultValue: 'development',
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    metaTitle: {
      type: DataTypes.STRING,
    },
    metaDescription: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: true,
    tableName: 'services',
    indexes: [
      {
        fields: ['slug'],
        unique: true,
      },
      {
        fields: ['category'],
      },
      {
        fields: ['active'],
      },
      {
        fields: ['order'],
      },
    ],
  });

  return Service;
};