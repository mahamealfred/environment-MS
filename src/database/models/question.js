'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.hasMany(models.Complaint, {
        foreignKey:'questionId',
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
      });
    }
  }
  Question.init({
    name: DataTypes.STRING,
    answers: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};