// backend/models/Testimonial.js
export default (sequelize, DataTypes) => {
  const Testimonial = sequelize.define('Testimonial', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientCompany: {
      type: DataTypes.STRING,
    },
    clientRole: {
      type: DataTypes.STRING,
    },
    clientAvatar: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
    project: {
      type: DataTypes.STRING,
    },
    projectType: {
      type: DataTypes.STRING,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'archived'),
      defaultValue: 'pending',
    },
    publishedAt: {
      type: DataTypes.DATE,
    },
    socialProof: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
  }, {
    timestamps: true,
    tableName: 'testimonials',
    indexes: [
      {
        fields: ['clientName'],
      },
      {
        fields: ['featured'],
      },
      {
        fields: ['status'],
      },
      {
        fields: ['rating'],
      },
    ],
  });

  return Testimonial;
};