'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scidanswers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        scidanswers.belongsTo(models.patients, {
        foreignKey: 'patientId',
        as: 'patient', // Nome da relação
      });
        scidanswers.belongsTo(models.scidQuestions, {
        foreignKey: 'questionId',
        as: 'question', // Nome da relação
      });
    }
  }
  scidanswers.init({
    disorder: DataTypes.STRING,
    answer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'scidanswers',
  });
  return scidanswers;
};