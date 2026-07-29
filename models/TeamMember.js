// backend/models/TeamMember.js
export default (sequelize, DataTypes) => {
  const TeamMember = sequelize.define('TeamMember', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    linkedinUrl: {
      type: DataTypes.STRING,
    },
    twitterUrl: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    timestamps: true,
    tableName: 'team_members',
    indexes: [
      { fields: ['active'] },
      { fields: ['order'] },
    ],
  });

  return TeamMember;
};
