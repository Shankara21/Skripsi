module.exports = (sequelize, DataTypes) => {
  const ProductDescParamsStd = sequelize.define("ProductDescParamsStd", {
    timestamps: false,
  });
  const TransactionDetails = sequelize.define("TransactionDetails", {
    timestamps: false,
  });
  const LogCalculation = sequelize.define("LogCalculation", {
    timestamps: false,
  });
  const Parameter = sequelize.define(
    "Parameter",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
      tableName: "mstParameters",
    }
  );
  Parameter.hasMany(ProductDescParamsStd, { foreignKey: "parameterId" });
  Parameter.hasMany(TransactionDetails, { foreignKey: "parameterId" });
  Parameter.hasMany(LogCalculation, { foreignKey: "parameterId" });
  return Parameter;
};
