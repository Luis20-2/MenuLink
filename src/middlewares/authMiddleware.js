const authService = require('../services/authService');

const authMiddleware = {
  // Middleware para verificar token
  authenticateToken: (req, res, next) => {
    try {
      // Obtener token del header
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Token de autenticación requerido'
        });
      }

      // Verificar token
      const decoded = authService.verifyToken(token);
      
      // Adjuntar datos del usuario a la request
      req.restaurantId = decoded.id;
      req.restaurantEmail = decoded.email;
      req.restaurantName = decoded.name;

      next();
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: error.message
      });
    }
  },

  // Middleware opcional (no requiere autenticación estricta)
  optionalAuthenticate: (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (token) {
        const decoded = authService.verifyToken(token);
        req.restaurantId = decoded.id;
        req.restaurantEmail = decoded.email;
        req.restaurantName = decoded.name;
      }

      next();
    } catch (error) {
      // Si el token es inválido, continuar sin autenticación
      next();
    }
  }
};

module.exports = authMiddleware;