const db = require('../models');
const Sequelize = require('sequelize');

class SegurancaService {
  async cadastrarAcl(dto) {
    const usuario = await db.usuarios.findOne({
      include: [
        {
          model: db.roles,
          as: 'usuario_role',
          attributes: ['id', 'nome', 'descricao'],
        },
        {
          model: db.permissoes,
          as: 'usuario_permissao',
          attributes: ['id', 'nome', 'descricao'],
        },
      ],
      where: {
        id: dto.usuarioId,
      },
    });

    if (!usuario) {
      throw new Error('Usuario não cadastrado.');
    }

    const rolesCadastradas = await db.roles.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.roles,
        },
      },
    });

    const permissoesCadastradas = await db.permissoes.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.permissoes,
        },
      },
    });

    await usuario.removeUsuario_role(usuario.usuario_role);
    await usuario.removeUsuario_permissao(usuario.usuario_permissao);

    await usuario.addUsuario_role(rolesCadastradas);
    await usuario.addUsuario_permissao(permissoesCadastradas);

    const newUsuario = await db.usuarios.findOne({
      include: [
        {
          model: db.roles,
          as: 'usuario_role',
          attributes: ['id', 'nome', 'descricao'],
        },
        {
          model: db.permissoes,
          as: 'usuario_permissao',
          attributes: ['id', 'nome', 'descricao'],
        },
      ],
      where: {
        id: dto.usuarioId,
      },
    });

    return newUsuario;
  }
}

module.exports = SegurancaService;
