module.exports = (sequelize, DataTypes) => {
  const DataStability = sequelize.define("DataStability", {
    timestamps: false,
  });
  const Parameter = sequelize.define("Parameter", { timestamps: false });
  const LogCalculation = sequelize.define(
    "LogCalculation",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      dataStabilityId: {
        type: DataTypes.INTEGER,
        references: {
          model: "dataStabilities",
          key: "id",
        },
      },
      parameterId: {
        type: DataTypes.INTEGER,
        references: {
          model: "mstParameters",
          key: "id",
        },
      },
      res30: {
        type: DataTypes.INTEGER,
      },
      res40: {
        type: DataTypes.INTEGER,
      },
      res50: {
        type: DataTypes.INTEGER,
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
      tableName: "logCalculations",
    }
  );

  LogCalculation.belongsTo(DataStability, { foreignKey: "dataStabilityId" });
  LogCalculation.belongsTo(Parameter, { foreignKey: "parameterId" });

  return LogCalculation;
};
