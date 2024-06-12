module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", { timestamps: false });
  const DataStability = sequelize.define("DataStability", {
    timestamps: false,
  });
  const TransactionDetails = sequelize.define("TransactionDetails", {
    timestamps: false,
  });
  const TransactionDataStability = sequelize.define(
    "TransactionDataStability",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      eventId: {
        type: DataTypes.INTEGER,
        references: {
          model: "events",
          key: "id",
        },
      },
      dataStabilityId: {
        type: DataTypes.INTEGER,
        references: {
          model: "dataStabilities",
          key: "id",
        },
      },
      attachmentSensory: {
        type: DataTypes.STRING,
      },
      attachmentAnalysis: {
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
      tableName: "transactionDataStabilities",
    }
  );
  TransactionDataStability.belongsTo(Event, { foreignKey: "eventId" });
  TransactionDataStability.belongsTo(DataStability, {
    foreignKey: "dataStabilityId",
  });
  TransactionDataStability.hasMany(TransactionDetails, {
    foreignKey: "transactionId",
  });
  return TransactionDataStability;
};
