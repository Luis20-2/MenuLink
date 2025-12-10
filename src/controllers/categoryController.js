const categoryService = require('../services/categoryService');

const categoryController = {
  // Crear categoría
  async createCategory(req, res) {
    try {
      const restaurantId = req.restaurantId;
      const categoryData = req.body;

      // Validaciones
      if (!categoryData.name) {
        return res.status(400).json({
          success: false,
          message: 'El nombre de la categoría es requerido'
        });
      }

      const category = await categoryService.createCategory(restaurantId, categoryData);

      res.status(201).json({
        success: true,
        message: 'Categoría creada exitosamente',
        data: category
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Obtener categorías del restaurante
  async getCategories(req, res) {
    try {
      const restaurantId = req.restaurantId;
      const categories = await categoryService.getRestaurantCategories(restaurantId);

      res.json({
        success: true,
        data: categories
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Obtener categoría específica
  async getCategory(req, res) {
    try {
      const restaurantId = req.restaurantId;
      const { id } = req.params;

      const category = await categoryService.getCategoryById(id, restaurantId);

      res.json({
        success: true,
        data: category
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  },

  // Actualizar categoría
  async updateCategory(req, res) {
    try {
      const restaurantId = req.restaurantId;
      const { id } = req.params;
      const updateData = req.body;

      const category = await categoryService.updateCategory(id, restaurantId, updateData);

      res.json({
        success: true,
        message: 'Categoría actualizada exitosamente',
        data: category
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Eliminar categoría
  async deleteCategory(req, res) {
    try {
      const restaurantId = req.restaurantId;
      const { id } = req.params;

      await categoryService.deleteCategory(id, restaurantId);

      res.json({
        success: true,
        message: 'Categoría eliminada exitosamente'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = categoryController;