const menuItemRepository = require('../repositories/menuItemRepository');
const categoryRepository = require('../repositories/categoryRepository');
const restaurantRepository = require('../repositories/restaurantRepository');

class MenuItemService {
  // Crear item de menú
  async createMenuItem(restaurantId, menuItemData) {
    try {
      // Verificar que el restaurante existe
      const restaurant = await restaurantRepository.findById(restaurantId);
      if (!restaurant) {
        throw new Error('Restaurante no encontrado');
      }

      // Verificar que la categoría pertenece al restaurante
      const isCategoryOwner = await categoryRepository.isOwner(menuItemData.category_id, restaurantId);
      if (!isCategoryOwner) {
        throw new Error('La categoría no pertenece a este restaurante');
      }

      // Asignar restaurant_id
      const dataWithRestaurantId = {
        ...menuItemData,
        restaurant_id: restaurantId
      };

      return await menuItemRepository.create(dataWithRestaurantId);
    } catch (error) {
      throw new Error(`Error al crear item de menú: ${error.message}`);
    }
  }

  // Obtener items del restaurante
  async getRestaurantMenuItems(restaurantId, filters = {}) {
    try {
      return await menuItemRepository.findAllByRestaurant(restaurantId, filters);
    } catch (error) {
      throw new Error(`Error al obtener items de menú: ${error.message}`);
    }
  }

  // Obtener item específico
  async getMenuItemById(menuItemId, restaurantId) {
    try {
      const menuItem = await menuItemRepository.findById(menuItemId, restaurantId);
      
      if (!menuItem) {
        throw new Error('Item de menú no encontrado');
      }

      return menuItem;
    } catch (error) {
      throw new Error(`Error al obtener item de menú: ${error.message}`);
    }
  }

  // Actualizar item
  async updateMenuItem(menuItemId, restaurantId, updateData) {
    try {
      // Si se actualiza la categoría, verificar que pertenece al restaurante
      if (updateData.category_id) {
        const isCategoryOwner = await categoryRepository.isOwner(updateData.category_id, restaurantId);
        if (!isCategoryOwner) {
          throw new Error('La nueva categoría no pertenece a este restaurante');
        }
      }

      return await menuItemRepository.update(menuItemId, restaurantId, updateData);
    } catch (error) {
      throw new Error(`Error al actualizar item de menú: ${error.message}`);
    }
  }

  // Eliminar item
  async deleteMenuItem(menuItemId, restaurantId) {
    try {
      return await menuItemRepository.delete(menuItemId, restaurantId);
    } catch (error) {
      throw new Error(`Error al eliminar item de menú: ${error.message}`);
    }
  }

  // Cambiar disponibilidad
  async toggleMenuItemAvailability(menuItemId, restaurantId, isAvailable) {
    try {
      return await menuItemRepository.toggleAvailability(menuItemId, restaurantId, isAvailable);
    } catch (error) {
      throw new Error(`Error al cambiar disponibilidad: ${error.message}`);
    }
  }

  // Buscar items
  async searchMenuItems(restaurantId, searchTerm) {
    try {
      return await menuItemRepository.search(restaurantId, searchTerm);
    } catch (error) {
      throw new Error(`Error en búsqueda: ${error.message}`);
    }
  }
}

module.exports = new MenuItemService();