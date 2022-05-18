const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");

const GenderType = sequelize.define(
  "GenderType",
  {
    // Model attributes are defined here
    description: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: false
  }
);

module.exports = GenderType;


GenderType.hasMany(require ('./movies'), {
  foreignKey: "genderTypeId",
  sourceKey: "id",
});
