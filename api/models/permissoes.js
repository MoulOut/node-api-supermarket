'use strict';
const { Model } = require('sequelize');
const usuarios = require('./usuarios');
module.exports = (sequelize, DataTypes) => {
  class permissoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      permissoes.belongsToMany(models.roles, {
        through: models.roles_permissoes,
        as: 'permissa_role',
        foreignKey: 'permissao_id',
      });
      permissoes.belongsToMany(models.usuarios, {
        through: models.usuarios_permissoes,
        as: 'permissao_usuario',
        foreignKey: 'permissao_id',
      });
    }
  }
  permissoes.init(
    {
      nome: DataTypes.STRING,
      descricao: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'permissoes',
    }
  );
  return permissoes;
};
