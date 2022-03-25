const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("activity", {
    name: {
      type: DataTypes.STRING,
    },
    dificulty: {
      type: DataTypes.INTEGER,
    },
    duration: {
      type: DataTypes.TIME,
    },
    season: {
      type: DataTypes.ENUM("winter", "summer", "fall", "spring"),
    },
  });
};
