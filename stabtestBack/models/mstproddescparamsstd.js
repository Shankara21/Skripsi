module.exports = (sequelize, DataTypes) => {
  const ProductDescription = sequelize.define("ProductDescription", {
    timestamps: false,
  });
  const Parameter = sequelize.define("Parameter", { timestamps: false });
  const ProductDescParamsStd = sequelize.define(
    "ProductDescParamsStd",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productDescId: {
        type: DataTypes.INTEGER,
        references: {
          model: "mstProductDescriptions",
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
      standard: {
        type: DataTypes.STRING,
      },
      standardType: {
        type: DataTypes.ENUM("range", "gte", "lte", "gt", "lt"),
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
      tableName: "mstProdDescParamsStds",
    }
  );
  ProductDescParamsStd.belongsTo(ProductDescription, {
    foreignKey: "productDescId",
  });
  ProductDescParamsStd.belongsTo(Parameter, { foreignKey: "parameterId" });
  return ProductDescParamsStd;
};
