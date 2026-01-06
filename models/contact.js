// models/Contact.js
export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
    },
    company: {
      type: DataTypes.STRING,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    serviceType: {
      type: DataTypes.ENUM(
        'custom_software',
        'web_apps',
        'mobile_apps',
        'desktop_apps',
        'saas',
        'cloud_infra',
        'digital_transformation',
        'consulting',
        'other'
      ),
      defaultValue: 'other',
    },
    budget: {
      type: DataTypes.ENUM('1k-5k', '5k-20k', '20k-50k', '50k+', 'undecided'),
      defaultValue: 'undecided',
    },
    timeline: {
      type: DataTypes.ENUM('urgent', '1-3months', '3-6months', '6months+'),
      defaultValue: '3-6months',
    },
    status: {
      type: DataTypes.ENUM('new', 'contacted', 'in_progress', 'converted', 'archived'),
      defaultValue: 'new',
    },
    assignedTo: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    source: {
      type: DataTypes.STRING,
      defaultValue: 'website',
    },
    ipAddress: {
      type: DataTypes.STRING,
    },
    userAgent: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: true,
    tableName: 'contacts',
    indexes: [
      {
        fields: ['email'],
      },
      {
        fields: ['status'],
      },
      {
        fields: ['createdAt'],
      },
    ],
  });

  Contact.associate = (models) => {
    Contact.belongsTo(models.User, {
      foreignKey: 'assignedTo',
      as: 'assignedUser',
    });
  };

  return Contact;
};