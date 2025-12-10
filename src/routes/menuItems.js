const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');
const authMiddleware = require('../middlewares/authMiddleware');

// Todas las rutas requieren autenticación
router.use(authMiddleware.authenticateToken);

/**
 * @swagger
 * /api/menu-items:
 *   post:
 *     summary: Crear nuevo item de menú
 *     tags: [Menu Items]
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
 *               - price
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tacos al Pastor"
 *               description:
 *                 type: string
 *                 example: "Tacos con carne al pastor y piña"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 120.50
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               image_url:
 *                 type: string
 *                 example: "http://ejemplo.com/imagen.jpg"
 *               display_order:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Item creado exitosamente
 */
router.post('/', menuItemController.createMenuItem);

/**
 * @swagger
 * /api/menu-items:
 *   get:
 *     summary: Obtener todos los items del menú
 *     tags: [Menu Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: integer
 *         description: Filtrar por categoría
 *       - in: query
 *         name: is_available
 *         schema:
 *           type: boolean
 *         description: Filtrar por disponibilidad
 *     responses:
 *       200:
 *         description: Lista de items del menú
 */
router.get('/', menuItemController.getMenuItems);

/**
 * @swagger
 * /api/menu-items/search:
 *   get:
 *     summary: Buscar items por nombre
 *     tags: [Menu Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Término de búsqueda
 *     responses:
 *       200:
 *         description: Resultados de búsqueda
 */
router.get('/search', menuItemController.searchMenuItems);

/**
 * @swagger
 * /api/menu-items/{id}:
 *   get:
 *     summary: Obtener item específico
 *     tags: [Menu Items]
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
 *         description: Item encontrado
 */
router.get('/:id', menuItemController.getMenuItem);

/**
 * @swagger
 * /api/menu-items/{id}:
 *   put:
 *     summary: Actualizar item
 *     tags: [Menu Items]
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
 *               price:
 *                 type: number
 *               category_id:
 *                 type: integer
 *               image_url:
 *                 type: string
 *               display_order:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item actualizado
 */
router.put('/:id', menuItemController.updateMenuItem);

/**
 * @swagger
 * /api/menu-items/{id}:
 *   delete:
 *     summary: Eliminar item
 *     tags: [Menu Items]
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
 *         description: Item eliminado
 */
router.delete('/:id', menuItemController.deleteMenuItem);

/**
 * @swagger
 * /api/menu-items/{id}/availability:
 *   patch:
 *     summary: Cambiar disponibilidad del item
 *     tags: [Menu Items]
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
 *             required:
 *               - is_available
 *             properties:
 *               is_available:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Disponibilidad actualizada
 */
router.patch('/:id/availability', menuItemController.toggleAvailability);

module.exports = router;