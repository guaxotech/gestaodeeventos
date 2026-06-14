import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // Assim que o site carregar, verifica se já havia um usuário logado antes
  useEffect(() => {
    const storagedUser = localStorage.getItem('@GestaoEventos:user');
    const storagedToken = localStorage.getItem('@GestaoEventos:token');

    if (storagedUser && storagedToken) {
      setUsuario(JSON.parse(storagedUser));
    }
    setLoading(false);
  }, []);

  // Função de Login
  async function login(email, senha) {
    const response = await api.post('/login', { email, senha });

    const { usuario: user, token } = response.data;

    setUsuario(user);

    // Salva no navegador para não deslogar ao dar F5
    localStorage.setItem('@GestaoEventos:user', JSON.stringify(user));
    localStorage.setItem('@GestaoEventos:token', token);
  }

  // Função de Logout (Sair)
  function logout() {
    localStorage.removeItem('@GestaoEventos:user');
    localStorage.removeItem('@GestaoEventos:token');
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ logged: !!usuario, usuario, setUsuario, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};