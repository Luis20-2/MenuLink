const menuItemService = require('../services/menuItemService');

const menuItemController = {
  // Crear item de menú
  async createMenuItem(req, res) {
    try {
      const restaurantId = req.restaurantId;
      const menuItemData = req.body;

      // Validaciones básicas
      if (!menuItemData.name || !menuItemData.price || !menuItemData.category_id) {
        return res.status(400).json({
          success: false,
          message: 'Nombre, precio y categoría son requeridos'
        });
      }

      const menuItem = await menuItemService.createMenuItem(restaurantId, menuItemData);

      res.status(201).json({
        success: true,
        message: 'Item de menú creado exitosamente',
        data: menuItem
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Obtener items del restaurante
  async getMenuItems(req, res) {
    try {
      const restaurantId = req.restaurantId;
      const filters = {
        category_id: req.query.category_id,
        is_available: req.query.is_available === 'true' ? true : 
                     req.query.is_available === 'false' ? false : undefined
      };

      const menuItems = await menuItemService.getRestaurantMenuItems(restaurantId, filters);

      res.json({
        success: true,
        data: menuItems
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Obtener item específico
  async getMenuItem(req, res) {
    try {
      const restaurantId = req.restaurantId;
      const { id } = req.params;

      const menuItem = await menuItemService.getMenuItemById(id, restaurantId);

      res.json({
        success: true,
        data: menuItem
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  },

  // Actualizar item
  async updateMenuItem(req, res) {
    try {
      const restaurantId = req.restaurantId;
      const { id } = req.params;
      const updateData = req.body;

      const menuItem = await menuItemService.updateMenuItem(id, restaurantId, updateData);

      res.json({
        success: true,
        message: 'Item de menú actualizado exitosamente',
        data: menuItem
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Eliminar item
  async deleteMenuItem(req, res) {
    try {
      const restaurantId = req.restaurantId;
      const { id } = req.params;

      await menuItemService.deleteMenuItem(id, restaurantId);

      res.json({
        success: true,
        message: 'Item de menú eliminado exitosamente'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Cambiar disponibilidad
  async toggleAvailability(req, res) {
    try {
      const restaurantId = req.restaurantId;
      const { id } = req.params;
      const { is_available } = req.body;

      if (typeof is_available !== 'boolean') {
        return res.status(400).json({
          success: false,
          message: 'El campo is_available debe ser true o false'
        });
      }

      const menuItem = await menuItemService.toggleMenuItemAvailability(id, restaurantId, is_available);

      res.json({
        success: true,
        message: `Item ${is_available ? 'disponible' : 'no disponible'}`,
        data: menuItem
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Buscar items
  async searchMenuItems(req, res) {
    try {
      const restaurantId = req.restaurantId;
      const { q } = req.query;

      if (!q || q.length < 2) {
        return res.status(400).json({
          success: false,
          message: 'Término de búsqueda debe tener al menos 2 caracteres'
        });
      }

      const results = await menuItemService.searchMenuItems(restaurantId, q);

      res.json({
        success: true,
        data: results
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = menuItemController;