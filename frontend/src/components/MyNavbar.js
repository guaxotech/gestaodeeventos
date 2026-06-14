import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function MyNavbar() {
  const { logged, usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login'); // Redireciona para o login após sair
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">🎉 Gestão de Eventos</Link>

      <div className="collapse navbar-collapse d-flex justify-content-between">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          {/* Se o usuário estiver logado E for admin, mostra os menus de gerenciar */}
          {logged && usuario?.tipo === 'admin' && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/eventos">Gerenciar Eventos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/palestrantes">Gerenciar Palestrantes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/participantes">Gerenciar Participantes</Link>
              </li>
            </>
          )}
        </ul>

        {/* Lado direito do menu: Login/Sair */}
        <div className="navbar-nav">
          {logged ? (
            <div className="d-flex align-items-center gap-3">
              <span className="navbar-text text-white me-3">
                Olá, <Link to="/perfil" className="text-warning text-decoration-none"><strong>{usuario?.nome}</strong></Link> ({usuario?.tipo})
              </span>
              <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                Sair
              </button>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link className="btn btn-outline-light btn-sm me-2" to="/login">Login</Link>
              <Link className="btn btn-primary btn-sm" to="/registrar">Criar Conta</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MyNavbar;