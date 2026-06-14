import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';

function Perfil() {
    const { usuario, setUsuario } = useContext(AuthContext); // pegamos os dados do contexto
    const [nome, setNome] = useState(usuario?.nome || '');
    const [email, setEmail] = useState(usuario?.email || '');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

    async function handleSubmit(e) {
        e.preventDefault();
        setMensagem({ tipo: '', texto: '' });

        // 1. CORREÇÃO: Busca exatamente a chave que o seu login salvou
        const token = localStorage.getItem('@GestaoEventos:token');

        // Se o usuário não estiver carregado no contexto, evita o envio incorreto
        if (!usuario) {
            setMensagem({ tipo: 'danger', texto: 'Erro interno: Dados do usuário não carregados.' });
            return;
        }

        const dadosParaAtualizar = { nome, email };

        if (senha) {
            dadosParaAtualizar.senha = senha;
        }

        try {
            // 2. CORREÇÃO: Envia usando o ID do usuário que vem do seu contexto
            const response = await api.put(`/usuarios/${usuario.id}`,
                dadosParaAtualizar
                , {
                    headers: {
                        Authorization: `Bearer ${token}` // Bearer com o token correto
                    }
                });

            // Atualiza o contexto global e o localStorage com os novos dados retornados do back
            setUsuario(response.data);
            localStorage.setItem('@GestaoEventos:user', JSON.stringify(response.data));

            setMensagem({ tipo: 'success', texto: 'Perfil atualizado com sucesso!' });
            setSenha(''); // Limpa o campo de senha por segurança
        } catch (err) {
            // 🚨 ISSO VAI FORÇAR O ERRO REAL A APARECER NO CONSOLE:
            console.error("ERRO COMPLETO CAPTURADO:", err);

            setMensagem({
                tipo: 'danger',
                texto: err.response?.data?.error || 'Erro ao atualizar perfil.'
            });
        }
    }

    return (
        <div className="container" style={{ maxWidth: '500px', marginTop: '30px' }}>
            <div className="card p-4 shadow-sm">
                <h3 className="mb-4 text-center">Meu Perfil</h3>

                {mensagem.texto && (
                    <div className={`alert alert-${mensagem.tipo}`}>{mensagem.texto}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nome</label>
                        <input type="text" className="form-control" value={nome} onChange={e => setNome(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">E-mail</label>
                        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Nova Senha (deixe em branco para não alterar)</label>
                        <input type="password" className="form-control" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Digite apenas se quiser mudar" />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Salvar Alterações</button>
                </form>
            </div>
        </div>
    );
}

export default Perfil;