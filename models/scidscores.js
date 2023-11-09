'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scidscores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        scidscores.belongsTo(models.patients, {
        foreignKey: 'patientId',
        as: 'patient', // Nome da relação
      });
    }
  }
  scidscores.init({
    lifetime_criteria: DataTypes.CHAR(1),
    past_criteria: DataTypes.CHAR(1),
    disorder: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'scidscores',
  });
  return scidscores;
};