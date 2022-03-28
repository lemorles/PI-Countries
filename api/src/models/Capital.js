const { DataTypes } = require("sequelize");

// South Africa has three capitals (id ZAF)
// Capitals:
// > Pretoria
// > Bloemfontein
// > Cape Town

module.exports = (sequelize) => {
  sequelize.define("capital", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
