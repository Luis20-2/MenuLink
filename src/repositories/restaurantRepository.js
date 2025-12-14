const Restaurant = require('../models/Restaurant');

class RestaurantRepository {
  // Buscar por email
  async findByEmail(email) {
    try {
      return await Restaurant.findOne({ 
        where: { email },
        attributes: { exclude: ['password'] }
      });
    } catch (error) {
      throw new Error(`Error al buscar restaurante por email: ${error.message}`);
    }
  }

  // Buscar por slug
  async findBySlug(slug) {
    try {
      return await Restaurant.findOne({ 
        where: { slug, is_active: true },
        attributes: { exclude: ['password'] }
      });
    } catch (error) {
      throw new Error(`Error al buscar restaurante por slug: ${error.message}`);
    }
  }

  // Buscar con contraseña (para login)
  async findByEmailWithPassword(email) {
    try {
      return await Restaurant.findOne({ 
        where: { email }
      });
    } catch (error) {
      throw new Error(`Error al buscar restaurante: ${error.message}`);
    }
  }

  // Crear nuevo restaurante
  async create(restaurantData) {
    try {
      return await Restaurant.create(restaurantData);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('El email o slug ya están registrados');
      }
      throw new Error(`Error al crear restaurante: ${error.message}`);
    }
  }

  // Buscar por ID
  async findById(id) {
    try {
      return await Restaurant.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: [
          {
            association: 'categories',
            include: ['menuItems']
          }
        ]
      });
    } catch (error) {
      throw new Error(`Error al buscar restaurante por ID: ${error.message}`);
    }
  }

  // Verificar si slug existe
  async slugExists(slug) {
    try {
      const count = await Restaurant.count({ where: { slug } });
      return count > 0;
    } catch (error) {
      throw new Error(`Error al verificar slug: ${error.message}`);
    }
  }

  // Activar restaurante por ID (marcar is_active = true)
  async activate(id) {
    try {
      const restaurant = await Restaurant.findByPk(id);
      if (!restaurant) return null;
      restaurant.is_active = true;
      await restaurant.save();
      return restaurant;
    } catch (error) {
      throw new Error(`Error al activar restaurante: ${error.message}`);
    }
  }

  // Actualizar contraseña por ID
  async updatePassword(id, newPassword) {
    try {
      const restaurant = await Restaurant.findByPk(id);
      if (!restaurant) return null;
      restaurant.password = newPassword;
      await restaurant.save();
      return restaurant;
    } catch (error) {
      throw new Error(`Error al actualizar contraseña: ${error.message}`);
    }
  }
}

module.exports = new RestaurantRepository();