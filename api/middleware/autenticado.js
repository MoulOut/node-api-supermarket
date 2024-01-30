const { verify, decode } = require('jsonwebtoken');
require('dotenv/config');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json('Acess token não informado.');
  }

  const [, accessToken] = token.split(' ');

  try {
    verify(accessToken, process.env.JWT_SECRET);

    const { id, email } = await decode(accessToken);

    req.usuarioId = id;
    req.usuarioEmail = email;

    next();
  } catch (error) {
    res.status(401).send('Usuario não autorizado.');
  }
};
