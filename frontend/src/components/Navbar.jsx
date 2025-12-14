import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand"><Link to="/">MenuLink</Link></div>

      <div className="navbar-menu">
        <Link className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Inicio</Link>
        {user && (
          <>
            <Link className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`} to="/dashboard">Panel</Link>
            <Link className={`navbar-link ${location.pathname === '/preview' ? 'active' : ''}`} to="/preview">Menú público</Link>
          </>
        )}
      </div>

      <div className="navbar-user">
        {user ? (
          <div className="navbar-user-info">
            <div>{user.name || ''}</div>
            <div style={{ fontSize: '0.8rem', color: '#ccc' }}>{user.email || ''}</div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
              <Link to="/dashboard" className="btn btn-outline btn-sm">Ir al panel</Link>
              <button className="btn btn-sm" onClick={logout}>Salir</button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm">Iniciar sesión</Link>
        )}
      </div>
    </nav>
  );
}
