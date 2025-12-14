import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';

export default function Confirm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('pending');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus('no-token');
      return;
    }

    const confirm = async () => {
      try {
        const resp = await apiClient.get(`/auth/confirm?token=${token}`);
        if (resp.data && resp.data.success) {
          setStatus('success');
          setTimeout(() => navigate('/login'), 2500);
        } else {
          setStatus('error');
        }
      } catch (err) {
        setStatus('error');
      }
    };

    confirm();
  }, [token, navigate]);

  return (
    <div className="container p-4" style={{ minHeight: '60vh' }}>
      <div style={{ maxWidth: 700, margin: '2rem auto', textAlign: 'center' }}>
        {status === 'pending' && <p>Confirmando tu cuenta, por favor espera...</p>}
        {status === 'no-token' && (
          <>
            <h2>Token no proporcionado</h2>
            <p>El enlace de confirmación parece estar incompleto.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <h2>Cuenta confirmada</h2>
            <p>Tu cuenta fue activada correctamente. Serás redirigido al login.</p>
          </>
        )}
        {status === 'error' && (
          <>
            <h2>Error al confirmar</h2>
            <p>No se pudo confirmar tu cuenta. El enlace pudo expirar o ser inválido.</p>
          </>
        )}
      </div>
    </div>
  );
}
