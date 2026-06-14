import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import Home from './pages/Home';
import CadastroParticipante from './pages/CadastroParticipante';
import AdminParticipantes from './pages/AdminParticipantes';
import AdminPalestrantes from './pages/AdminPalestrantes';
import AdminEventos from './pages/AdminEventos';
import DetalhesEvento from './pages/DetalhesEvento';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import CadastroUsuario from './pages/CadastroUsuario';
import Perfil from './pages/Perfil';

function App() {
  return (
    <AuthProvider>
    <Router>
      <MyNavbar />
      <div className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<CadastroParticipante />} />
          <Route path="/admin/participantes" element={<AdminParticipantes />} />
          <Route path="/admin/palestrantes" element={<AdminPalestrantes />} />
          <Route path="/admin/eventos" element={<AdminEventos />} />
          <Route path="/evento/:id" element={<DetalhesEvento />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<CadastroUsuario />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;