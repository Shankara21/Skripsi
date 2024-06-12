module.exports = (sequelize, DataTypes) => { 
  const DataStability = sequelize.define("DataStability", {timestamps: false});
  const Line = sequelize.define(
    "Line",
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
      tableName: "mstLines",
    }
  );
  Line.hasMany(DataStability, { foreignKey: "lineId" });
  return Line;
};