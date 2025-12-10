const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

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
 *         description: Restaurante registrado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/register', authController.register);

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
 *         description: Credenciales incorrectas
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

module.exports = router;