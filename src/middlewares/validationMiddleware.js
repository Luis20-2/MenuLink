const { validationResult } = require('express-validator');

const validationMiddleware = {
  // Validar campos usando express-validator
  validateFields: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: errors.array().map(err => ({
          field: err.param,
          message: err.msg
        }))
      });
    }
    next();
  },

  // Validar que el restaurante esté activo
  validateRestaurantActive: async (req, res, next) => {
    try {
      const restaurantId = req.restaurantId;
      const { Restaurant } = require('../models');
      
      const restaurant = await Restaurant.findByPk(restaurantId);
      
      if (!restaurant || !restaurant.is_active) {
        return res.status(403).json({
          success: false,
          message: 'El restaurante no está activo'
        });
      }
      
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al validar restaurante'
      });
    }
  }
};

module.exports = validationMiddleware;