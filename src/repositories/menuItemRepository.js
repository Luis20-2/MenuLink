const { MenuItem, Category, Restaurant } = require('../models');

class MenuItemRepository {
  // Crear nuevo item de menú
  async create(menuItemData) {
    try {
      return await MenuItem.create(menuItemData);
    } catch (error) {
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        throw new Error('La categoría o restaurante no existe');
      }
      throw new Error(`Error al crear item de menú: ${error.message}`);
    }
  }

  // Buscar por ID
  async findById(id, restaurantId = null) {
    try {
      const whereClause = { id };
      if (restaurantId) {
        whereClause.restaurant_id = restaurantId;
      }

      return await MenuItem.findOne({
        where: whereClause,
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['id', 'name']
          },
          {
            model: Restaurant,
            as: 'restaurant',
            attributes: ['id', 'name', 'slug']
          }
        ]
      });
    } catch (error) {
      throw new Error(`Error al buscar item de menú: ${error.message}`);
    }
  }

  // Obtener todos los items de un restaurante
  async findAllByRestaurant(restaurantId, filters = {}) {
    try {
      const whereClause = { restaurant_id: restaurantId };
      
      // Aplicar filtros
      if (filters.category_id) {
        whereClause.category_id = filters.category_id;
      }
      
      if (filters.is_available !== undefined) {
        whereClause.is_available = filters.is_available;
      }

      return await MenuItem.findAll({
        where: whereClause,
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['id', 'name']
          }
        ],
        order: [
          ['category_id', 'ASC'],
          ['display_order', 'ASC'],
          ['name', 'ASC']
        ]
      });
    } catch (error) {
      throw new Error(`Error al buscar items de menú: ${error.message}`);
    }
  }

  // Actualizar item de menú
  async update(id, restaurantId, updateData) {
    try {
      const [updated] = await MenuItem.update(updateData, {
        where: { id, restaurant_id: restaurantId }
      });

      if (updated === 0) {
        throw new Error('Item no encontrado o no tienes permisos');
      }

      return await this.findById(id, restaurantId);
    } catch (error) {
      throw new Error(`Error al actualizar item de menú: ${error.message}`);
    }
  }

  // Eliminar item de menú
  async delete(id, restaurantId) {
    try {
      const deleted = await MenuItem.destroy({
        where: { id, restaurant_id: restaurantId }
      });

      if (deleted === 0) {
        throw new Error('Item no encontrado o no tienes permisos');
      }

      return true;
    } catch (error) {
      throw new Error(`Error al eliminar item de menú: ${error.message}`);
    }
  }

  // Cambiar disponibilidad
  async toggleAvailability(id, restaurantId, isAvailable) {
    try {
      const [updated] = await MenuItem.update(
        { is_available: isAvailable, updated_at: new Date() },
        { where: { id, restaurant_id: restaurantId } }
      );

      if (updated === 0) {
        throw new Error('Item no encontrado o no tienes permisos');
      }

      return await this.findById(id, restaurantId);
    } catch (error) {
      throw new Error(`Error al cambiar disponibilidad: ${error.message}`);
    }
  }

  // Buscar items por nombre (búsqueda)
  async search(restaurantId, searchTerm) {
    try {
      return await MenuItem.findAll({
        where: {
          restaurant_id: restaurantId,
          is_available: true,
          name: {
            [Op.like]: `%${searchTerm}%`
          }
        },
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['id', 'name']
          }
        ],
        limit: 20
      });
    } catch (error) {
      throw new Error(`Error en búsqueda: ${error.message}`);
    }
  }
}

module.exports = new MenuItemRepository();