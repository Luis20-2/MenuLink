import apiClient from './apiClient';

const publicService = {
  getMenuBySlug: async (slug) => {
    const response = await apiClient.get(`/public/menu/${slug}`);
    return response.data;
  },

  getActiveRestaurants: async () => {
    const response = await apiClient.get('/public/restaurants');
    return response.data;
  }
};

export default publicService;
