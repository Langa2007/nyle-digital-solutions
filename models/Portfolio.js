// backend/models/Portfolio.js
export default (sequelize, DataTypes) => {
  const Portfolio = sequelize.define('Portfolio', {
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
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    duration: {
      type: DataTypes.STRING,
    },
    teamSize: {
      type: DataTypes.INTEGER,
    },
    technologies: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    featuredImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    videoUrl: {
      type: DataTypes.STRING,
    },
    liveUrl: {
      type: DataTypes.STRING,
    },
    githubUrl: {
      type: DataTypes.STRING,
    },
    challenges: {
      type: DataTypes.TEXT,
    },
    solutions: {
      type: DataTypes.TEXT,
    },
    results: {
      type: DataTypes.TEXT,
    },
    metrics: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      defaultValue: 'published',
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    timestamps: true,
    tableName: 'portfolio',
    indexes: [
      {
        fields: ['slug'],
        unique: true,
      },
      {
        fields: ['category'],
      },
      {
        fields: ['featured'],
      },
      {
        fields: ['status'],
      },
    ],
  });

  return Portfolio;
};