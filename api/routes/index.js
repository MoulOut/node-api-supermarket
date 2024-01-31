const bodyParser = require('body-parser');

const produto = require('./produtoRoute');
const usuario = require('./usuariosRoute');
const auth = require('./authRoutes');
const role = require('./roleRoutes');

module.exports = (app) => {
  app.use(bodyParser.json(), auth, usuario, produto, role);
};
