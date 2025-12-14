import React from 'react';

export default function Home() {
  return (
    <div className="container p-4" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div style={{
        backgroundColor: '#f0f8ff',
        padding: '4rem 2rem',
        borderRadius: '8px',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{ fontSize: '3rem', color: '#2c3e50' }}>🍽️ MenuLink</h1>
        <p style={{ fontSize: '1.25rem', color: '#555' }}>
          Plataforma de Gestión de Menús Digitales para Restaurantes
        </p>
        <p style={{ fontSize: '1.1rem', color: '#777', marginTop: '1rem' }}>
          Crea, gestiona y comparte tu menú digital de forma fácil y profesional
        </p>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}
      >
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">✨ Fácil de Usar</h3>
          </div>
          <div className="card-body">
            <p>Interfaz intuitiva y amigable para gestionar categorías e items de tu menú sin complicaciones.</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📱 Responsivo</h3>
          </div>
          <div className="card-body">
            <p>Tu menú digital se adapta perfecto a cualquier dispositivo, desktop, tablet o móvil.</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🔐 Seguro</h3>
          </div>
          <div className="card-body">
            <p>Autenticación segura con JWT y cifrado de contraseñas para proteger tu información.</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🎨 Personalizable</h3>
          </div>
          <div className="card-body">
            <p>Organiza tus productos con categorías personalizadas y órdenes de visualización.</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">👁️ Vista Previa</h3>
          </div>
          <div className="card-body">
            <p>Visualiza cómo verán tus clientes el menú antes de compartirlo públicamente.</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🚀 Rápido</h3>
          </div>
          <div className="card-body">
            <p>Rendimiento optimizado para cargar rápidamente, incluso con muchos items.</p>
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: '#f0f8ff',
        padding: '2rem',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h2>¿Listo para comenzar?</h2>
        <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '2rem' }}>
          Crea tu cuenta y comienza a gestionar tu menú digital hoy mismo
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="/register" className="btn btn-primary btn-lg">
            Crear Restaurante
          </a>
          <a href="/login" className="btn btn-secondary btn-lg">
            Iniciar Sesión
          </a>
        </div>
      </div>
    </div>
  );
}
