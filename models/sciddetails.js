'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sciddetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        sciddetails.belongsTo(models.patients, {
        foreignKey: 'patientId',
        as: 'patient', // Nome da relação
      });
    }
  }
  sciddetails.init({
    criteria: DataTypes.STRING,
    score: DataTypes.STRING,
    disorder: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sciddetails',
  });
  return sciddetails;
};