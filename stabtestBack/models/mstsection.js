module.exports = (sequelize, DataTypes) => {
  const DataStability = sequelize.define("DataStability", {
    timestamps: false,
  });

  const EmailUser = sequelize.define("EmailUser", { timestamps: false });
  const Section = sequelize.define(
    "Section",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      code: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
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
      tableName: "mstSections",
    }
  );
  Section.hasMany(DataStability, { foreignKey: "sectionId" });
  Section.hasMany(EmailUser, { foreignKey: "sectionId" });
  return Section;
};
