const jwt = require('jsonwebtoken');
const restaurantRepository = require('../repositories/restaurantRepository');
const jwtConfig = require('../config/jwt');

class AuthService {
  // Generar token JWT
  generateToken(restaurant) {
    const payload = {
      id: restaurant.id,
      email: restaurant.email,
      name: restaurant.name
    };

    return jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
      algorithm: jwtConfig.algorithm
    });

    return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24h'  // Expira en 24 horas
    });
  } 

  // Registrar nuevo restaurante
  async register(restaurantData) {
    try {
      // Verificar si el email ya existe
      const existingRestaurant = await restaurantRepository.findByEmailWithPassword(restaurantData.email);
      if (existingRestaurant) {
        throw new Error('El email ya está registrado');
      }

      // Generar slug único
      const baseSlug = restaurantData.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      let slug = baseSlug;
      let counter = 1;

      // Verificar si el slug ya existe y generar uno único
      while (await restaurantRepository.slugExists(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      // Asignar slug al restaurante
      restaurantData.slug = slug;

      // Crear restaurante
      const restaurant = await restaurantRepository.create(restaurantData);

      // Generar token
      const token = this.generateToken(restaurant);

      // Retornar respuesta sin contraseña
      const restaurantResponse = {
        id: restaurant.id,
        name: restaurant.name,
        email: restaurant.email,
        slug: restaurant.slug,
        address: restaurant.address,
        phone: restaurant.phone,
        is_active: restaurant.is_active,
        created_at: restaurant.created_at
      };

      return {
        token,
        restaurant: restaurantResponse
      };
    } catch (error) {
      throw new Error(`Error en registro: ${error.message}`);
    }
  }

  // Login de restaurante
  async login(email, password) {
    try {
      // Buscar restaurante con contraseña
      const restaurant = await restaurantRepository.findByEmailWithPassword(email);
      if (!restaurant) {
        throw new Error('Credenciales incorrectas');
      }

      // Verificar contraseña
      const isValidPassword = await restaurant.comparePassword(password);
      if (!isValidPassword) {
        throw new Error('Credenciales incorrectas');
      }

      // Verificar si el restaurante está activo
      if (!restaurant.is_active) {
        throw new Error('El restaurante no está activo');
      }

      // Generar token
      const token = this.generateToken(restaurant);

      // Retornar respuesta sin contraseña
      const restaurantResponse = {
        id: restaurant.id,
        name: restaurant.name,
        email: restaurant.email,
        slug: restaurant.slug,
        address: restaurant.address,
        phone: restaurant.phone,
        is_active: restaurant.is_active,
        created_at: restaurant.created_at
      };

      return {
        token,
        restaurant: restaurantResponse
      };
    } catch (error) {
      throw new Error(`Error en login: ${error.message}`);
    }
  }

  // Verificar token
  verifyToken(token) {
    try {
      return jwt.verify(token, jwtConfig.secret);
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }
}

module.exports = new AuthService();