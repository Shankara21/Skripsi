module.exports = (sequelize, DataTypes) => {
  const ProductDescription = sequelize.define('ProductDescription', { timestamps: false });
  const Schedule = sequelize.define('Schedule', { timestamps: false });
  const DataStability = sequelize.define('DataStability', { timestamps: false });
  const Product = sequelize.define(
    "Product",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      code: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      slug: {
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
      tableName: "mstProducts",
    }
  );
  Product.hasMany(Schedule, { foreignKey: "productId" });
  Product.hasMany(ProductDescription, { foreignKey: 'productId' });
  Product.hasMany(DataStability, { foreignKey: 'productId' });
  return Product;
};
