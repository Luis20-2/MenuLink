import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Alert from '../components/Alert';
import '../styles/forms.css';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Token no válido');
      return;
    }

    if (!password || !confirmPassword) {
      setError('Completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al restablecer contraseña');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div className="form-container" style={{ maxWidth: '450px', textAlign: 'center' }}>
          <h2>❌ Enlace Inválido</h2>
          <p style={{ color: '#666' }}>
            Este enlace no es válido
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-center" style={{ minHeight: 'calc(100vh - 80px)', padding: '2rem' }}>
      <div className="form-container" style={{ maxWidth: '450px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>🔐 Nueva Contraseña</h2>

        {error && (
          <Alert 
            type="error" 
            message={error} 
            onClose={() => setError('')}
          />
        )}

        {success && (
          <Alert 
            type="success" 
            message="✅ Contraseña restablecida. Redirigiendo..." 
          />
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Nueva Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1.5rem' }}
            disabled={loading}
          >
            {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '13px', color: '#999' }}>
          ¿Recuerdas tu contraseña? <a href="/login" style={{ color: '#667eea' }}>Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
}
