'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Action.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Action.belongsTo(models.Complaint, {
        foreignKey: "complaintId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Action.init({
    userId: DataTypes.STRING,
    complaintId: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Action',
  });
  return Action;
};