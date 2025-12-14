const authService = require('../services/authService');
const { sendVerificationEmail } = require('../services/emailService');
const { generateVerificationCode, getVerificationCodeExpiry } = require('../utils/generateCode');
const Restaurant = require('../models/Restaurant');

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

      // Verificar si el email ya existe
      const existingRestaurant = await Restaurant.findOne({ where: { email } });
      if (existingRestaurant) {
        return res.status(400).json({
          success: false,
          message: 'El email ya está registrado'
        });
      }

      // Crear restaurante con código de verificación
      const verificationCode = generateVerificationCode();
      const expiresAt = getVerificationCodeExpiry();

      const restaurant = await Restaurant.create({
        name,
        email,
        password,
        address: address || null,
        phone: phone || null,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        is_verified: false,
        is_active: false,
        verification_code: verificationCode,
        verification_code_expires: expiresAt
      });

      // Enviar email de verificación
      await sendVerificationEmail(restaurant.name, restaurant.email, verificationCode);

      res.status(201).json({
        success: true,
        message: '✅ Restaurante registrado. Revisa tu email para verificar la cuenta',
        data: {
          id: restaurant.id,
          name: restaurant.name,
          email: restaurant.email
        }
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(400).json({
        success: false,
        message: error.message || 'Error al registrar el restaurante'
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
      const restaurant = await Restaurant.findByPk(req.user.id, {
        attributes: ['id', 'name', 'email', 'slug', 'address', 'phone']
      });
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurante no encontrado' });
      }
      res.json({ restaurant });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener perfil' });
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
  },

  // Confirmar email mediante token
  async confirm(req, res) {
    try {
      const token = req.query.token || req.body.token;
      if (!token) {
        return res.status(400).json({ success: false, message: 'Token de verificación requerido' });
      }

      await authService.verifyEmail(token);

      res.json({ success: true, message: 'Email confirmado. Tu cuenta está activa.' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Solicitar restablecimiento de contraseña
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, message: 'Email es requerido' });
      }

      await authService.sendPasswordReset(email);
      res.json({ success: true, message: 'Si la cuenta existe, se envió un email con instrucciones.' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  // Restablecer contraseña usando token
  async resetPassword(req, res) {
    try {
      const { token, password } = req.body;
      if (!token || !password) {
        return res.status(400).json({ success: false, message: 'Token y nueva contraseña son requeridos' });
      }

      await authService.resetPassword(token, password);
      res.json({ success: true, message: 'Contraseña restablecida correctamente' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
};

module.exports = authController;