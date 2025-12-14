import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export default function PerfilRestaurante() {
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setPerfil(data.restaurant))
      .catch(() => setPerfil(null));
  }, []);

  if (!perfil) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Información de tu Restaurante</h2>
      <p>Nombre: {perfil.name}</p>
      <p>Email: {perfil.email}</p>
    </div>
  );
}