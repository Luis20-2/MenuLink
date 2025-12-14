import React, { createContext, useContext, useEffect, useState } from 'react';

const API_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/auth`;
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then(data => {
        if (data?.restaurant) setUser(data.restaurant);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const register = async (restaurantData) => {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(restaurantData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || 'Error en el registro');
    return data;
  };

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const payload = await res.json();
    if (!res.ok || !payload?.data?.token) {
      throw new Error(payload?.message || 'Error en la autenticación');
    }

    localStorage.setItem('token', payload.data.token);
    setUser(payload.data.restaurant || null);
    return payload.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
