// models/JobApplication.js
export default (sequelize, DataTypes) => {
  const JobApplication = sequelize.define('JobApplication', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    jobId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
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
      allowNull: false,
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coverLetter: {
      type: DataTypes.TEXT,
    },
    experience: {
      type: DataTypes.INTEGER,
      comment: 'Years of experience',
    },
    currentCompany: {
      type: DataTypes.STRING,
    },
    portfolioUrl: {
      type: DataTypes.STRING,
    },
    githubUrl: {
      type: DataTypes.STRING,
    },
    linkedinUrl: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('pending', 'reviewed', 'shortlisted', 'rejected', 'hired'),
      defaultValue: 'pending',
    },
    notes: {
      type: DataTypes.TEXT,
    },
    appliedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: true,
    tableName: 'job_applications',
    indexes: [
      {
        fields: ['jobId'],
      },
      {
        fields: ['email'],
      },
      {
        fields: ['status'],
      },
    ],
  });

  return JobApplication;
};