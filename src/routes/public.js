const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

/**
 * @swagger
 * /api/public/menu/{slug}:
 *   get:
 *     summary: Obtener menú público de un restaurante
 *     tags: [Public]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug único del restaurante
 *     responses:
 *       200:
 *         description: Menú del restaurante
 *       404:
 *         description: Restaurante no encontrado
 */
router.get('/menu/:slug', publicController.getMenuBySlug);

/**
 * @swagger
 * /api/public/restaurants:
 *   get:
 *     summary: Listar todos los restaurantes activos
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Lista de restaurantes
 */
router.get('/restaurants', publicController.getActiveRestaurants);

module.exports = router;