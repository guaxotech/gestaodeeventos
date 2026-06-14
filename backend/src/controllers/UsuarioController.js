const Usuario = require('../models/Usuario');
const Participante = require('../models/Participante');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

module.exports = {
    // 1. Criar novo utilizador (Sign Up)
    async store(req, res) {
        try {
            const { nome, email, senha, tipo } = req.body;

            // Verificar se o email já existe
            const usuarioExiste = await Usuario.findOne({ where: { email } });
            if (usuarioExiste) {
                return res.status(400).json({ error: 'Este email já está registado.' });
            }

            // Encriptar a senha para segurança
            const senhaHash = await bcrypt.hash(senha, 8);

            const usuario = await Usuario.create({
                nome,
                email,
                senha: senhaHash,
                tipo: tipo || 'normal' // Garante que se não enviar, será normal
            });

            // Cria o Participante vinculado a esse usuário automaticamente
            await Participante.create({
                nome: usuario.nome,       // Puxa o nome do usuário
                email: usuario.email,     // Puxa o e-mail
                usuarioId: usuario.id     // 🔑 Salva o ID do usuário como Chave Estrangeira!
            });

            // Ocultar a senha no retorno do JSON
            usuario.senha = undefined;

            return res.status(201).json(usuario);
        } catch (err) {
            console.error("=== ERRO DETALHADO NO TERMINAL ===", err);
            return res.status(500).json({ error: 'Erro ao criar utilizador.' });
        }
    },

    // 2. Autenticação (Login)
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            // Buscar o utilizador pelo email
            const usuario = await Usuario.findOne({ where: { email } });
            if (!usuario) {
                return res.status(401).json({ error: 'Utilizador não encontrado.' });
            }

            // Comparar a senha digitada com a senha encriptada na base de dados
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
            if (!senhaCorreta) {
                return res.status(401).json({ error: 'Senha incorreta.' });
            }

            // Ocultar a senha
            usuario.senha = undefined;

            // Gerar o Token JWT
            // Guarda o ID e o TIPO do utilizador dentro do token
            const token = jwt.sign(
                { id: usuario.id, tipo: usuario.tipo },
                SECRET,
                { expiresIn: '1d' }
            );

            // Retornar os dados do utilizador e o Token para o Frontend
            return res.json({ usuario, token });
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao realizar login.' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, senha } = req.body;

            // req.usuarioId vem do Token decodificado no middleware.
            if (String(id) !== String(req.usuarioId)) {
                return res.status(403).json({ error: 'Acesso negado. Você só pode modificar o seu próprio perfil.' });
            }

            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            // Atualiza os dados
            usuario.nome = nome || usuario.nome;
            usuario.email = email || usuario.email;

            if (senha) {
                usuario.senha = await bcrypt.hash(senha, 8);
            }

            await usuario.save();

            return res.json({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            });

        } catch (err) {
            return res.status(500).json({ error: 'Erro ao atualizar perfil.' });
        }
    }
};