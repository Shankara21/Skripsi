module.exports = (sequelize, DataTypes) => {
  const TransactionDataStability = sequelize.define(
    "TransactionDataStability",
    { timestamps: false }
  );
  const Parameter = sequelize.define("Parameter", { timestamps: false });
  const TransactionDetails = sequelize.define(
    "TransactionDetails",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      transactionId: {
        type: DataTypes.INTEGER,
        references: {
          model: "transactionDataStabilities",
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
      value: {
        type: DataTypes.FLOAT,
      },
      status: {
        type: DataTypes.ENUM("Passed", "Failed", "Not Checked"),
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
      tableName: "transactionDetails",
    }
  );
  TransactionDetails.belongsTo(TransactionDataStability, {
    foreignKey: "transactionId",
  });
  TransactionDetails.belongsTo(Parameter, { foreignKey: "parameterId" });
  return TransactionDetails;
};
