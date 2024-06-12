module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", { timestamps: false });
  const variant = sequelize.define("Variant", { timestamps: false });
  const ProductDescParamsStd = sequelize.define("ProductDescParamsStd", {
    timestamps: false,
  });
  const DataStability = sequelize.define("DataStability", {
    timestamps: false,
  });
  const ProductDescription = sequelize.define(
    "ProductDescription",
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
      variantId: {
        type: DataTypes.INTEGER,
        references: {
          model: "mstVariants",
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
      tableName: "mstProductDescriptions",
    }
  );
  ProductDescription.belongsTo(Product, { foreignKey: "productId" });
  ProductDescription.belongsTo(variant, { foreignKey: "variantId" });
  ProductDescription.hasMany(ProductDescParamsStd, {
    foreignKey: "productDescId",
  });
  ProductDescription.hasMany(DataStability, { foreignKey: "productDescId" });
  return ProductDescription;
};
