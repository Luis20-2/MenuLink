import apiClient from './apiClient';

const menuItemService = {
  getAll: async () => {
    const response = await apiClient.get('/menu-items');
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/menu-items/${id}`);
    return response.data;
  },

  getByCategory: async (categoryId) => {
    const response = await apiClient.get(`/menu-items/category/${categoryId}`);
    return response.data;
  },

  create: async (itemData) => {
    const response = await apiClient.post('/menu-items', itemData);
    return response.data;
  },

  update: async (id, itemData) => {
    const response = await apiClient.put(`/menu-items/${id}`, itemData);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/menu-items/${id}`);
    return response.data;
  }
};

export default menuItemService;
