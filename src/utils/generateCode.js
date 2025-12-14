/**
 * Genera un código de verificación aleatorio de 6 dígitos
 * @returns {string} Código de 6 dígitos
 */
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Calcula la fecha de expiración del código (15 minutos desde ahora)
 * @returns {Date} Fecha de expiración
 */
const getVerificationCodeExpiry = () => {
  const now = new Date();
  return new Date(now.getTime() + 15 * 60 * 1000); // 15 minutos
};

module.exports = {
  generateVerificationCode,
  getVerificationCodeExpiry
};