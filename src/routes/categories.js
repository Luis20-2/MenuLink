const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

// Todas las rutas requieren autenticación
router.use(authMiddleware.authenticateToken);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Crear nueva categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Entradas"
 *               description:
 *                 type: string
 *                 example: "Platillos para comenzar"
 *               display_order:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 */
router.post('/', categoryController.createCategory);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Obtener todas las categorías del restaurante
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
router.get('/', categoryController.getCategories);
 

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Obtener categoría específica
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *       404:
 *         description: Categoría no encontrada
 */
router.get('/:id', categoryController.getCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Actualizar categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               display_order:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Categoría actualizada
 */
router.put('/:id', categoryController.updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Eliminar categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría eliminada
 */
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;