module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {timestamps: false});
  const EmailUser = sequelize.define(
    "EmailUser",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sectionId: {
        type: DataTypes.INTEGER,
        references: {
          model: "mstSections",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      nik: {
        type: DataTypes.STRING,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "emailUsers",
    }
  );
  EmailUser.belongsTo(Section, {foreignKey: "sectionId"});
  return EmailUser;
};
