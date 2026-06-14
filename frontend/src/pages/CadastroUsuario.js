import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('normal'); // Padrão é usuário normal
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');

    try {
      await api.post('/usuarios', { nome, email, senha, tipo });
      alert('Usuário cadastrado com sucesso! Faça o seu login.');
      navigate('/login'); // Redireciona para a tela de login
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao cadastrar usuário.');
    }
  }

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-4">Criar Conta</h3>
        {erro && <div className="alert alert-danger">{erro}</div>}
        
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
            <label className="form-label">Senha</label>
            <input type="password" className="form-control" value={senha} onChange={e => setSenha(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Tipo de Conta</label>
            <select className="form-select" value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="normal">Usuário Normal</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default CadastroUsuario;