const authService = require('../services/authService');

const authController = {
  // Registrar nuevo restaurante
  async register(req, res) {
    try {
      const { name, email, password, address, phone } = req.body;

      // Validaciones básicas
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Nombre, email y contraseña son requeridos'
        });
      }

      const result = await authService.register({
        name,
        email,
        password,
        address,
        phone
      });

      res.status(201).json({
        success: true,
        message: 'Restaurante registrado exitosamente',
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Login de restaurante
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validaciones básicas
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email y contraseña son requeridos'
        });
      }

      const result = await authService.login(email, password);

      res.json({
        success: true,
        message: 'Login exitoso',
        data: result
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  },

  // Obtener perfil del restaurante autenticado
  async getProfile(req, res) {
    try {
      const restaurantId = req.restaurantId;
      
      // Aquí después se implementará con el repositorio
      // Por ahora retornamos datos básicos
      
      res.json({
        success: true,
        data: {
          id: restaurantId,
          email: req.restaurantEmail,
          name: req.restaurantName
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Verificar token
  async verifyToken(req, res) {
    try {
      const token = req.headers['authorization']?.split(' ')[1];
      
      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'Token no proporcionado'
        });
      }

      const decoded = authService.verifyToken(token);

      res.json({
        success: true,
        message: 'Token válido',
        data: decoded
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = authController;