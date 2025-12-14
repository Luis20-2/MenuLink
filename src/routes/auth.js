const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const authService = require('../services/authService');
const { sendVerificationEmail } = require('../services/emailService');
const { generateVerificationCode, getVerificationCodeExpiry } = require('../utils/generateCode');
const Restaurant = require('../models/Restaurant');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo restaurante
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mi Restaurante"
 *               email:
 *                 type: string
 *                 example: "restaurante@email.com"
 *               password:
 *                 type: string
 *                 example: "contraseña123"
 *               address:
 *                 type: string
 *                 example: "Av. Principal 123"
 *               phone:
 *                 type: string
 *                 example: "555-1234"
 *     responses:
 *       201:
 *         description: Restaurante registrado exitosamente. Verifica tu email.
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/verify-code:
 *   post:
 *     summary: Verificar código de confirmación de email
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - verificationCode
 *             properties:
 *               email:
 *                 type: string
 *                 example: "restaurante@email.com"
 *               verificationCode:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Email verificado correctamente
 *       400:
 *         description: Código inválido o expirado
 *       404:
 *         description: Restaurante no encontrado
 */
router.post('/verify-code', async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
      return res.status(400).json({
        success: false,
        message: 'Email y código de verificación requeridos'
      });
    }

    const restaurant = await Restaurant.findOne({ where: { email } });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurante no encontrado'
      });
    }

    // Verificar que el código coincida
    if (restaurant.verification_code !== verificationCode) {
      return res.status(400).json({
        success: false,
        message: 'Código de verificación incorrecto'
      });
    }

    // Verificar que no haya expirado
    if (new Date() > restaurant.verification_code_expires) {
      return res.status(400).json({
        success: false,
        message: 'Código de verificación expirado'
      });
    }

    // Marcar como verificado
    restaurant.is_verified = true;
    restaurant.is_active = true;
    restaurant.verification_code = null;
    restaurant.verification_code_expires = null;
    await restaurant.save();

    res.status(200).json({
      success: true,
      message: '✅ Email verificado correctamente. ¡Cuenta activada!',
      data: {
        id: restaurant.id,
        name: restaurant.name,
        email: restaurant.email
      }
    });
  } catch (error) {
    console.error('Error al verificar código:', error);
    res.status(500).json({
      success: false,
      message: 'Error al verificar el código'
    });
  }
});

/**
 * @swagger
 * /api/auth/resend-code:
 *   post:
 *     summary: Reenviar código de verificación
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "restaurante@email.com"
 *     responses:
 *       200:
 *         description: Nuevo código enviado
 *       400:
 *         description: Email ya verificado
 *       404:
 *         description: Restaurante no encontrado
 */
router.post('/resend-code', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email requerido'
      });
    }

    const restaurant = await Restaurant.findOne({ where: { email } });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurante no encontrado'
      });
    }

    if (restaurant.is_verified) {
      return res.status(400).json({
        success: false,
        message: 'Este email ya está verificado'
      });
    }

    // Generar nuevo código
    const verificationCode = generateVerificationCode();
    const expiresAt = getVerificationCodeExpiry();

    restaurant.verification_code = verificationCode;
    restaurant.verification_code_expires = expiresAt;
    await restaurant.save();

    // Enviar email
    await sendVerificationEmail(restaurant.name, restaurant.email, verificationCode);

    res.status(200).json({
      success: true,
      message: '✅ Nuevo código enviado a tu email'
    });
  } catch (error) {
    console.error('Error al reenviar código:', error);
    res.status(500).json({
      success: false,
      message: 'Error al reenviar el código'
    });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "restaurante@email.com"
 *               password:
 *                 type: string
 *                 example: "contraseña123"
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales incorrectas o email no verificado
 */
router.post('/login', authController.login);



/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Obtener perfil del restaurante autenticado
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido exitosamente
 *       401:
 *         description: No autorizado
 */
router.get('/profile', authMiddleware.authenticateToken, authController.getProfile);

/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Verificar token JWT
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token inválido o expirado
 */
router.get('/verify', authController.verifyToken);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Solicitar restablecimiento de contraseña
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *     responses:
 *       200:
 *         description: Email de recuperación enviado (si la cuenta existe)
 */
router.post('/forgot-password', authController.forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Restablecer contraseña usando token
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña restablecida correctamente
 */
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: 'Token y contraseña requeridos'
      });
    }

    const result = await authService.resetPassword(token, password);
    res.json(result);
  } catch (error) {
    console.error('❌ Error reset password:', error.message);
    res.status(400).json({
      success: false,
      message: error.message || 'Error al restablecer contraseña'
    });
  }
});

/**
 * @route POST /api/auth/test-email
 * @desc Endpoint de prueba para enviar email
 * @access Public (solo para desarrollo)
 */
router.post('/test-email', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email requerido'
      });
    }

    // Enviar email de prueba
    await sendVerificationEmail('Restaurante Test', email, '123456');

    res.json({
      success: true,
      message: '✅ Email de prueba enviado correctamente',
      details: {
        to: email,
        code: '123456',
        service: process.env.EMAIL_SERVICE,
        from: process.env.EMAIL_FROM
      }
    });
  } catch (error) {
    console.error('❌ Error enviando email de prueba:', error);
    res.status(500).json({
      success: false,
      message: 'Error al enviar email',
      error: error.message
    });
  }
});


module.exports = router;