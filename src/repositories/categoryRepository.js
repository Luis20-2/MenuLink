const { Category, Restaurant, MenuItem } = require('../models');

class CategoryRepository {
  // Crear nueva categoría
  async create(categoryData) {
    try {
      return await Category.create(categoryData);
    } catch (error) {
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        throw new Error('El restaurante no existe');
      }
      throw new Error(`Error al crear categoría: ${error.message}`);
    }
  }

  // Buscar por ID
  async findById(id, restaurantId = null) {
    try {
      const whereClause = { id };
      if (restaurantId) {
        whereClause.restaurant_id = restaurantId;
      }

      return await Category.findOne({
        where: whereClause,
        include: [
          {
            model: MenuItem,
            as: 'menuItems',
            where: { is_available: true },
            required: false,
            order: [['display_order', 'ASC']]
          }
        ]
      });
    } catch (error) {
      throw new Error(`Error al buscar categoría: ${error.message}`);
    }
  }

  // Obtener todas las categorías de un restaurante
  async findAllByRestaurant(restaurantId) {
    try {
      return await Category.findAll({
        where: { restaurant_id: restaurantId },
        include: [
          {
            model: MenuItem,
            as: 'menuItems',
            where: { is_available: true },
            required: false,
            order: [['display_order', 'ASC']]
          }
        ],
        order: [['display_order', 'ASC']]
      });
    } catch (error) {
      throw new Error(`Error al buscar categorías: ${error.message}`);
    }
  }

  // Actualizar categoría
  async update(id, restaurantId, updateData) {
    try {
      const [updated] = await Category.update(updateData, {
        where: { id, restaurant_id: restaurantId }
      });

      if (updated === 0) {
        throw new Error('Categoría no encontrada o no tienes permisos');
      }

      return await this.findById(id, restaurantId);
    } catch (error) {
      throw new Error(`Error al actualizar categoría: ${error.message}`);
    }
  }

  // Eliminar categoría
  async delete(id, restaurantId) {
    try {
      const deleted = await Category.destroy({
        where: { id, restaurant_id: restaurantId }
      });

      if (deleted === 0) {
        throw new Error('Categoría no encontrada o no tienes permisos');
      }

      return true;
    } catch (error) {
      throw new Error(`Error al eliminar categoría: ${error.message}`);
    }
  }

  // Verificar si el restaurante es dueño de la categoría
  async isOwner(categoryId, restaurantId) {
    try {
      const category = await Category.findOne({
        where: { id: categoryId, restaurant_id: restaurantId }
      });
      return category !== null;
    } catch (error) {
      throw new Error(`Error al verificar propiedad: ${error.message}`);
    }
  }
}

module.exports = new CategoryRepository();