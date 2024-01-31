const db = require('../models');
const uuid = require('uuid');

class RoleServices {
  async cadastrar(dto) {
    const role = db.roles.findOne({
      where: {
        nome: dto.nome,
      },
    });

    if (role) {
      throw new Error('Role já cadastrada');
    }

    try {
      const newRole = db.roles.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao,
      });

      return newRole;
    } catch (error) {
      throw new Error('Erro ao cadastrar Role.');
    }
  }
}

module.exports = RoleServices;
