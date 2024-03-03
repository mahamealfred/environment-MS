'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Location.hasMany(models.Complaint, {
        foreignKey:'locationId',
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
      });
    }
  }
  Location.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};