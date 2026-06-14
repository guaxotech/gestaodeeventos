import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');

    try {
      await login(email, senha);
      navigate('/'); // Login feito com sucesso! Vai para a Home
    } catch (err) {
      setErro(err.response?.data?.error || 'E-mail ou senha incorretos.');
    }
  }

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-4">Login</h3>
        {erro && <div className="alert alert-danger">{erro}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input type="password" className="form-control" value={senha} onChange={e => setSenha(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-success w-100 mb-3">Entrar</button>
        </form>

        <div className="text-center">
          <small>Não tem conta? <Link to="/registrar">Cadastre-se aqui</Link></small>
        </div>
      </div>
    </div>
  );
}

export default Login;