const publicService = require('../services/publicService');

const publicController = {
  async getMenuBySlug(req, res) {
    try {
      const { slug } = req.params;
      const menuData = await publicService.getRestaurantMenuBySlug(slug);
      
      res.json({
        success: true,
        data: menuData
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  },

  async getActiveRestaurants(req, res) {
    try {
      const restaurants = await publicService.getActiveRestaurants();
      
      res.json({
        success: true,
        data: restaurants
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener restaurantes'
      });
    }
  }
};

module.exports = publicController;