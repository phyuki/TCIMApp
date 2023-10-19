'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scoresdass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      scoresdass.belongsTo(models.patients, {
        foreignKey: 'patientId',
        as: 'patient', // Nome da relação
      });
    }
  }
  scoresdass.init({
    scoreA: DataTypes.INTEGER,
    scoreD: DataTypes.INTEGER,
    scoreE: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'scoresdass',
  });
  return scoresdass;
};