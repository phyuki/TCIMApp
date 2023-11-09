'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dassscores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      dassscores.belongsTo(models.patients, {
        foreignKey: 'patientId',
        as: 'patient', // Nome da relação
      });
    }
  }
  dassscores.init({
    scoreA: DataTypes.INTEGER,
    scoreD: DataTypes.INTEGER,
    scoreE: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dassscores',
  });
  return dassscores;
};