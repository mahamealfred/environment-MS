'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Complaint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Complaint.belongsTo(models.Category, {
        foreignKey:'categoryId',
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
      });

      Complaint.belongsTo(models.Question, {
        foreignKey: "questionId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
       Complaint.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      
      Complaint.belongsTo(models.Location, {
        foreignKey: "locationId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Complaint.init({
    userId: DataTypes.STRING,
    categoryId: DataTypes.STRING,
    locationId: DataTypes.STRING,
    questionId: DataTypes.ARRAY(DataTypes.STRING),
    description: DataTypes.ARRAY(DataTypes.STRING),
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Complaint',
  });
  return Complaint;
};