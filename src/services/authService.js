const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Restaurant = require('../models/Restaurant');
const { sendVerificationEmail, sendPasswordResetEmail } = require('./emailService');
const crypto = require('crypto');

const authService = {
  // Login
  async login(email, password) {
    const restaurant = await Restaurant.findOne({ where: { email } });

    if (!restaurant) {
      throw new Error('Email o contraseña incorrectos');
    }

    // Verificar que el email esté confirmado
    if (!restaurant.is_verified) {
      throw new Error('Por favor verifica tu email antes de iniciar sesión');
    }

    // Verificar contraseña
    const isPasswordValid = await restaurant.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Email o contraseña incorrectos');
    }

    // Generar JWT
    const token = jwt.sign(
      { 
        id: restaurant.id, 
        email: restaurant.email,
        name: restaurant.name
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      token,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        email: restaurant.email,
        slug: restaurant.slug
      }
    };
  },

  // Verificar token JWT
  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  },

  // Verificar email (para el endpoint /confirm)
  async verifyEmail(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const restaurant = await Restaurant.findByPk(decoded.id);

    if (!restaurant) {
      throw new Error('Restaurante no encontrado');
    }

    restaurant.is_verified = true;
    restaurant.is_active = true;
    await restaurant.save();

    return restaurant;
  },

  // Enviar email de recuperación de contraseña
  async sendPasswordReset(email) {
    console.log('🔍 [sendPasswordReset] Email recibido:', email);
    
    const restaurant = await Restaurant.findOne({ where: { email } });
    console.log('🔍 [sendPasswordReset] Restaurante encontrado:', restaurant ? restaurant.email : 'NO');

    if (!restaurant) {
      console.log('⚠️ [sendPasswordReset] Restaurante no encontrado:', email);
      return { success: true, message: 'Si la cuenta existe, recibirás un email.' };
    }

    try {
      // Generar token seguro
      const resetToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      
      console.log('🔍 [sendPasswordReset] Token generado:', resetToken.substring(0, 10) + '...');

      // Guardar token hasheado y expiry (1 hora)
      restaurant.reset_password_token = hashedToken;
      restaurant.reset_password_expires = new Date(Date.now() + 60 * 60 * 1000);
      await restaurant.save();
      
      console.log('✅ [sendPasswordReset] Token guardado en BD');

      // Generar link de reset
      const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
      console.log('🔍 [sendPasswordReset] Link generado:', resetLink.substring(0, 50) + '...');

      // Enviar email
      console.log('📧 [sendPasswordReset] Intentando enviar email a:', restaurant.email);
      await sendPasswordResetEmail(restaurant.name, restaurant.email, resetLink);
      console.log('✅ [sendPasswordReset] Email enviado correctamente');

      return { 
        success: true, 
        message: '✅ Email de recuperación enviado',
        debug: { email, hashedToken: hashedToken.substring(0, 10) + '...' }
      };
    } catch (error) {
      console.error('❌ [sendPasswordReset] Error completo:', error);
      console.error('❌ [sendPasswordReset] Mensaje:', error.message);
      console.error('❌ [sendPasswordReset] Stack:', error.stack);
      
      // Limpiar token si falla el email
      restaurant.reset_password_token = null;
      restaurant.reset_password_expires = null;
      await restaurant.save();
      
      throw error;
    }
  },

  // Resetear contraseña
  async resetPassword(token, newPassword) {
    // Hash del token recibido
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const restaurant = await Restaurant.findOne({
      where: {
        reset_password_token: hashedToken,
        reset_password_expires: {
          [require('sequelize').Op.gt]: new Date()
        }
      }
    });

    if (!restaurant) {
      throw new Error('Token inválido o expirado');
    }

    // Actualizar contraseña
    restaurant.password = newPassword;
    restaurant.reset_password_token = null;
    restaurant.reset_password_expires = null;
    await restaurant.save();

    return { success: true, message: '✅ Contraseña restablecida correctamente' };
  }
};

module.exports = authService;