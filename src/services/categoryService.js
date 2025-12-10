const categoryRepository = require('../repositories/categoryRepository');
const restaurantRepository = require('../repositories/restaurantRepository');

class CategoryService {
  // Crear categoría
  async createCategory(restaurantId, categoryData) {
    try {
      // Verificar que el restaurante existe
      const restaurant = await restaurantRepository.findById(restaurantId);
      if (!restaurant) {
        throw new Error('Restaurante no encontrado');
      }

      // Asignar restaurant_id
      const dataWithRestaurantId = {
        ...categoryData,
        restaurant_id: restaurantId
      };

      return await categoryRepository.create(dataWithRestaurantId);
    } catch (error) {
      throw new Error(`Error al crear categoría: ${error.message}`);
    }
  }

  // Obtener categorías del restaurante
  async getRestaurantCategories(restaurantId) {
    try {
      return await categoryRepository.findAllByRestaurant(restaurantId);
    } catch (error) {
      throw new Error(`Error al obtener categorías: ${error.message}`);
    }
  }

  // Obtener categoría específica
  async getCategoryById(categoryId, restaurantId) {
    try {
      const category = await categoryRepository.findById(categoryId, restaurantId);
      
      if (!category) {
        throw new Error('Categoría no encontrada');
      }

      return category;
    } catch (error) {
      throw new Error(`Error al obtener categoría: ${error.message}`);
    }
  }

  // Actualizar categoría
  async updateCategory(categoryId, restaurantId, updateData) {
    try {
      return await categoryRepository.update(categoryId, restaurantId, updateData);
    } catch (error) {
      throw new Error(`Error al actualizar categoría: ${error.message}`);
    }
  }

  // Eliminar categoría
  async deleteCategory(categoryId, restaurantId) {
    try {
      return await categoryRepository.delete(categoryId, restaurantId);
    } catch (error) {
      throw new Error(`Error al eliminar categoría: ${error.message}`);
    }
  }
}

module.exports = new CategoryService();