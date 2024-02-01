const db = require('../models');

const roles = (listaRoles) => {
  return async (req, res, next) => {
    const { usuarioId } = req;

    const usuario = await db.usuarios.findOne({
      include: [
        {
          model: db.roles,
          as: 'usuario_role',
          attributes: ['id', 'nome'],
        },
      ],
      where: {
        id: usuarioId,
      },
    });

    if (!usuario) {
      return res.status(401).send('Usuario não cadastrado.');
    }

    const rolesCadastradas = usuario.usuario_role
      .map((role) => role.nome)
      .some((role) => listaRoles.includes(role));

    if (!rolesCadastradas) {
      return res.status(401).send('Usuario não possui acesso a essa rota.');
    }

    return next();
  };
};

module.exports = roles;
