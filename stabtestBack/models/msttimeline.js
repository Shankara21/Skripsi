module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define("Schedule", { timestamps: false });
  const Timeline = sequelize.define(
    "Timeline",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      time: {
        type: DataTypes.STRING,
      },
      value: {
        type: DataTypes.FLOAT,
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
      tableName: "mstTimelines",
    }
  );
  Timeline.hasMany(Schedule, { foreignKey: "timelineId" });
  return Timeline;
};
