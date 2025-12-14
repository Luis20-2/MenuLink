import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import '../styles/forms.css';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Por favor ingresa tu email');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError('Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-center" style={{ minHeight: 'calc(100vh - 80px)', padding: '2rem' }}>
      <div className="form-container" style={{ maxWidth: '450px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>🔐 ¿Olvidaste tu Contraseña?</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
          Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
        </p>

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
            message="✅ Revisa tu email para restablecer tu contraseña. Redirigiendo..." 
          />
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '13px', color: '#999' }}>
          ¿Recuerdas tu contraseña? <a href="/login" style={{ color: '#667eea' }}>Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
}
