module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define("Schedule", { timestamps: false });
  const Temperature = sequelize.define(
    "Temperature",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      value: {
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
      tableName: "mstTemperatures",
    }
  );
  Temperature.hasMany(Schedule, { foreignKey: "temperatureId" });
  return Temperature;
};
