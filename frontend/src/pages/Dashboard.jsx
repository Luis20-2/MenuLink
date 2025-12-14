import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/forms.css';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="container p-4">
      <h1>Bienvenido, {user?.name}!</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
        Panel de administración para gestionar tu menú digital.
      </p>

      <div
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}
      >
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📂 Categorías</h3>
          </div>
          <div className="card-body">
            <p>Gestiona las categorías de tu menú (Entradas, Platos Principales, Postres, etc.)</p>
          </div>
          <div className="card-footer">
            <a href="/categories" className="btn btn-primary">
              Ir a Categorías
            </a>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🍽️ Items de Menú</h3>
          </div>
          <div className="card-body">
            <p>Crea y edita los items que aparecerán en tu menú digital.</p>
          </div>
          <div className="card-footer">
            <a href="/menu-items" className="btn btn-primary">
              Ir a Items
            </a>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">👁️ Vista Previa</h3>
          </div>
          <div className="card-body">
            <p>Visualiza cómo verán tus clientes tu menú digital.</p>
          </div>
          <div className="card-footer">
            <a href="/preview" className="btn btn-primary">
              Ver Previa
            </a>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <h3>📋 Información de tu Restaurante</h3>
        <table style={{ width: '100%', marginTop: '1rem' }}>
          <tbody>
            <tr>
              <td style={{ fontWeight: 'bold', padding: '0.5rem' }}>Nombre:</td>
              <td style={{ padding: '0.5rem' }}>{user?.name}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold', padding: '0.5rem' }}>Email:</td>
              <td style={{ padding: '0.5rem' }}>{user?.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
