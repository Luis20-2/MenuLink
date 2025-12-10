const { Restaurant, Category, MenuItem } = require('../models');

class PublicService {
  async getRestaurantMenuBySlug(slug) {
    try {
      const restaurant = await Restaurant.findOne({
        where: { 
          slug, 
          is_active: true 
        },
        attributes: { 
          exclude: ['password', 'email', 'created_at', 'updated_at'] 
        },
        include: [
          {
            model: Category,
            as: 'categories',
            include: [
              {
                model: MenuItem,
                as: 'menuItems',
                where: { is_available: true },
                required: false,
                attributes: ['id', 'name', 'description', 'price', 'image_url'],
                order: [['display_order', 'ASC']]
              }
            ],
            where: {}, // Incluir todas las categorías
            required: false,
            order: [['display_order', 'ASC']]
          }
        ]
      });

      if (!restaurant) {
        throw new Error('Restaurante no encontrado o no está activo');
      }

      // Formatear la respuesta
      const formattedRestaurant = {
        id: restaurant.id,
        name: restaurant.name,
        slug: restaurant.slug,
        address: restaurant.address,
        phone: restaurant.phone,
        logo_url: restaurant.logo_url,
        categories: restaurant.categories.map(category => ({
          id: category.id,
          name: category.name,
          description: category.description,
          menuItems: category.menuItems
        }))
      };

      return formattedRestaurant;
    } catch (error) {
      throw new Error(`Error al obtener menú público: ${error.message}`);
    }
  }

  async getActiveRestaurants() {
    try {
      const restaurants = await Restaurant.findAll({
        where: { is_active: true },
        attributes: ['id', 'name', 'slug', 'address', 'phone', 'logo_url'],
        order: [['name', 'ASC']],
        limit: 50
      });

      return restaurants;
    } catch (error) {
      throw new Error(`Error al obtener restaurantes: ${error.message}`);
    }
  }
}

module.exports = new PublicService();