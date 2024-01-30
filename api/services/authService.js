const db = require('../models/index');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
require('dotenv/config');

class AuthService {
  async login(dto) {
    const usuario = await db.usuarios.findOne({
      attributes: ['id', 'email', 'senha'],
      where: {
        email: dto.email,
      },
    });

    if (!usuario) {
      throw new Error('Usuario não existe.');
    }
    const senhasIguais = await compare(dto.senha, usuario.senha);

    if (!senhasIguais) {
      throw new Error('Usuario ou senha incorreta.');
    }

    const token = sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return { token };
  }
}

module.exports = AuthService;
