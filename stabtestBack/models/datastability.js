module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", { timestamps: false });
  const ProductDescription = sequelize.define("ProductDescription", {
    timestamps: false,
  });
  const Line = sequelize.define("Line", { timestamps: false });
  const Section = sequelize.define("Section", { timestamps: false });
  const Event = sequelize.define("Event", { timestamps: false });
  const LogCalculation = sequelize.define("LogCalculation", {timestamps: false});
  const DataStability = sequelize.define(
    "DataStability",
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
      productDescId: {
        type: DataTypes.INTEGER,
        references: {
          model: "mstProductDescriptions",
          key: "id",
        },
      },
      lineId: {
        type: DataTypes.INTEGER,
        references: {
          model: "mstLines",
          key: "id",
        },
      },
      sectionId: {
        type: DataTypes.INTEGER,
        references: {
          model: "mstSections",
          key: "id",
        },
      },
      description: {
        type: DataTypes.STRING,
      },
      pic: {
        type: DataTypes.STRING,
      },
      lotNumber: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATEONLY,
      },
      status: {
        type: DataTypes.ENUM("Done", "Canceled", "On Progress"),
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
      tableName: "dataStabilities",
    }
  );
  DataStability.belongsTo(Product, { foreignKey: "productId" });
  DataStability.belongsTo(ProductDescription, {
    foreignKey: "productDescId",
  });
  DataStability.belongsTo(Line, { foreignKey: "lineId" });
  DataStability.belongsTo(Section, { foreignKey: "sectionId" });
  DataStability.hasMany(Event, { foreignKey: "dataStabilityId" });
  DataStability.hasMany(LogCalculation, { foreignKey: "dataStabilityId" });
  return DataStability;
};
