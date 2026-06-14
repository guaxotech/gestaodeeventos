const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  // 1. Pegar o token que vem no cabeçalho da requisição
  const authHeader = req.headers.authorization;

  // 2. Verificar se o cabeçalho existe
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  // O formato comum do header é: "Bearer <TOKEN>". Vamos separar em duas partes.
  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).json({ error: 'Erro no formato do token.' });
  }

  const [ scheme, token ] = parts;

  // Verificar se a primeira parte contém a palavra "Bearer"
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token malformado.' });
  }

  // 3. Validar o Token JWT
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }

    // Se o token estiver correto, salvamos os dados do usuário dentro da requisição (req)
    // Assim, os controllers da frente saberão QUEM está logado e QUAL o tipo dele (admin ou normal)
    req.usuarioId = decoded.id;
    req.usuarioTipo = decoded.tipo;

    return next();
  });
};