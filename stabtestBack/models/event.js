module.exports = (sequelize, DataTypes) => {
  const DataStability = sequelize.define("DataStability", {
    timestamps: false,
  });
  const Schedule = sequelize.define("Schedule", { timestamps: false });
  const Event = sequelize.define(
    "Event",
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
      scheduleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "schedules",
          key: "id",
        },
      },
      date: {
        type: DataTypes.DATEONLY,
      },
      description: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("Done", "Not Yet"),
        defaultValue: "Not Yet",
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
      tableName: "events",
    }
  );
  Event.belongsTo(DataStability, { foreignKey: "dataStabilityId" });
  Event.belongsTo(Schedule, { foreignKey: "scheduleId" });
  return Event;
};
