'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dassanswers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        dassanswers.belongsTo(models.patients, {
        foreignKey: 'patientId',
        as: 'patient', // Nome da relação
      });
        dassanswers.belongsTo(models.dassQuestions, {
        foreignKey: 'questionId',
        as: 'question', // Nome da relação
      });
    }
  }
  dassanswers.init({
    answer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dassanswers',
  });
  return dassanswers;
};