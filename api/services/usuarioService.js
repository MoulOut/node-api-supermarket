const db = require('../models/index');
const { hash } = require('bcryptjs');
const uuid = require('uuid');

class UsuarioService {
  async cadastrar(dto) {
    const usuario = await db.usuarios.findOne({
      where: {
        email: dto.email,
      },
    });
    if (usuario) {
      throw new Error('Usuario já cadastrado.');
    }

    try {
      const hashSenha = await hash(dto.senha, 8);
      const novoUsuario = await db.usuarios.create({
        id: uuid.v4(),
        nome: dto.nome,
        email: dto.email,
        senha: hashSenha,
      });

      return novoUsuario;
    } catch (error) {
      throw new Error('Erro ao cadastrar usuario.');
    }
  }
}

module.exports = UsuarioService;
