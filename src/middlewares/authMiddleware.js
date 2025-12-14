const jwt = require('jsonwebtoken');
const { Restaurant } = require('../models'); // Ajusta la ruta si es necesario
const authController = require('../controllers/authController');
const authService = require('../services/authService');

const authMiddleware = {
  // Middleware para verificar token
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      // Propaga datos clave para los servicios y repos
      req.user = user;
      req.restaurantId = user.id;
      req.restaurantEmail = user.email;
      req.restaurantName = user.name;
      next();
    });
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
  },

 
};

module.exports = authMiddleware;

