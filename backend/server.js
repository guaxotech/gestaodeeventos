const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./src/config/database');
const routes = require('./src/routes/routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

// Sincronizar Banco de Dados
sequelize.sync({ force: true }) // 'force: false' evita apagar os dados toda vez que reiniciar
  .then(() => console.log('Banco de dados sincronizado!'))
  .catch(err => console.error('Erro ao sincronizar banco:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});