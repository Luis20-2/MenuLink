import apiClient from './apiClient';

const authService = {
  register: async (restaurantData) => {
    const response = await apiClient.post('/auth/register', restaurantData);
    return response.data;
  },

  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('restaurantId', response.data.data.id);
      localStorage.setItem('restaurantName', response.data.data.name);
      localStorage.setItem('restaurantEmail', response.data.data.email);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('restaurantId');
    localStorage.removeItem('restaurantName');
    localStorage.removeItem('restaurantEmail');
  },

  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
  ,

    forgotPassword: async (email) => {
      const response = await apiClient.post('/auth/forgot-password', { email });
      return response.data;
    },

    resetPassword: async ({ token, password }) => {
      const response = await apiClient.post('/auth/reset-password', { token, password });
      return response.data;
    }
};

export default authService;
