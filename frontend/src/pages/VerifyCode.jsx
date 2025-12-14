import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Alert from '../components/Alert';
import '../styles/forms.css';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export default function VerifyCode() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!code || code.length !== 6) {
      setError('Ingresa un código válido de 6 dígitos');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          verificationCode: code 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al verificar código');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/login', { state: { message: 'Email verificado. Inicia sesión con tus credenciales.' } });
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/auth/resend-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Error al reenviar código');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-center" style={{ minHeight: 'calc(100vh - 80px)', padding: '2rem' }}>
      <div className="form-container" style={{ maxWidth: '450px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '28px' }}>🔐 Verifica tu Email</h2>
          <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
            Enviamos un código a <strong>{email || 'tu email'}</strong>
          </p>
        </div>

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
            message="✅ Email verificado. Redirigiendo al login..." 
          />
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="code" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Código de Verificación
            </label>
            <input
              type="text"
              id="code"
              maxLength="6"
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              style={{ 
                fontSize: '28px', 
                textAlign: 'center', 
                letterSpacing: '12px',
                fontWeight: 'bold',
                padding: '15px'
              }}
              required
              disabled={loading}
            />
            <small style={{ color: '#999', display: 'block', marginTop: '0.5rem' }}>
              Ingresa los 6 dígitos que recibiste por email
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1.5rem' }}
            disabled={loading || code.length !== 6}
          >
            {loading ? 'Verificando...' : 'Verificar Código'}
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem', 
          paddingTop: '1.5rem',
          borderTop: '1px solid #eee'
        }}>
          <p style={{ fontSize: '14px', color: '#666', margin: '0 0 1rem 0' }}>
            ¿No recibiste el código?
          </p>
          <button
            onClick={handleResend}
            disabled={loading}
            style={{
              background: 'none',
              border: 'none',
              color: '#667eea',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {loading ? 'Enviando...' : 'Reenviar Código'}
          </button>
        </div>

        <p style={{ 
          textAlign: 'center', 
          marginTop: '2rem', 
          fontSize: '13px',
          color: '#999'
        }}>
          ¿Ya tienes cuenta? <a href="/login" style={{ color: '#667eea', textDecoration: 'none' }}>Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
}