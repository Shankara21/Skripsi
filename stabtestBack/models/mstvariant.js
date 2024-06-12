module.exports = (sequelize, DataTypes) => {
  const ProductDescription = sequelize.define("ProductDescription", {timestamps: false});
  const Variant = sequelize.define(
    "Variant",
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
      tableName: "mstVariants",
    }
  );
  Variant.hasMany(ProductDescription, {foreignKey: 'variantId'});
  return Variant;
};
