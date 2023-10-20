'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scidQuestions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  scidQuestions.init({
    cod: DataTypes.STRING,
    question: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'scidQuestions',
  });
  return scidQuestions;
};