module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", { timestamps: false });
  const Temperature = sequelize.define("Temperature", { timestamps: false });
  const Timeline = sequelize.define("Timeline", { timestamps: false });
  const Event = sequelize.define("Event", { timestamps: false });
  const Schedule = sequelize.define(
    "Schedule",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: "mstProducts",
          key: "id",
        },
      },
      timelineId: {
        type: DataTypes.INTEGER,
        references: {
          model: "mstTimelines",
          key: "id",
        },
      },
      temperatureId: {
        type: DataTypes.INTEGER,
        references: {
          model: "mstTemperatures",
          key: "id",
        },
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
      tableName: "mstSchedules",
    }
  );
  Schedule.belongsTo(Product, { foreignKey: "productId" });
  Schedule.belongsTo(Timeline, { foreignKey: "timelineId" });
  Schedule.belongsTo(Temperature, { foreignKey: "temperatureId" });
  Schedule.hasMany(Event, { foreignKey: "scheduleId" });
  return Schedule;
};
