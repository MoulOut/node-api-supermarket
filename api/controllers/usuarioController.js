const UsuarioService = require('../services/usuarioService');

const usuarioService = new UsuarioService();

class UsuarioController {
  static async cadastrar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      const usuario = await usuarioService.cadastrar({ nome, email, senha });
      res.status(201).send(usuario);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = UsuarioController;
