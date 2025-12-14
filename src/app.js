// ============================================
// MenuLink - Archivo Principal del Servidor
// Backend II - Proyecto Final
// ============================================

const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./routes/auth');
const categoriesRoutes = require('./routes/categories');
const menuItemsRoutes = require('./routes/menuItems');
const publicRoutes = require('./routes/public');

// Importar conexión a base de datos
const { sequelize } = require('./config/database');

const app = express();
const PORT = parseInt(process.env.PORT) || 3000;

// ============================================
// MIDDLEWARES
// ============================================

app.use(cors());
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`[LOG] ${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// ============================================
// CONFIGURACIÓN SWAGGER
// ============================================

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MenuLink API',
      version: '1.0.0',
      description: 'API para gestión de menús digitales de restaurantes',
      contact: {
        name: 'MenuLink Team',
        email: 'support@menulink.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  security:[{
    bearerAuth: []
  }],
  
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Ruta de documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ============================================
// RUTAS DE LA API
// ============================================

// Log antes de registrar rutas
console.log('[DEBUG] Registrando rutas de API...');

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/menu-items', menuItemsRoutes);
app.use('/api/public', publicRoutes);

console.log('[DEBUG] Rutas registradas correctamente');

// ============================================
// RUTAS DEL SISTEMA
// ============================================

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 MenuLink API - Backend II',
    description: 'Sistema de gestión de menús digitales para restaurantes',
    author: 'Luis Arturo Contreras Cortez',
    endpoints: {
      auth: '/api/auth',
      categories: '/api/categories',
      menuItems: '/api/menu-items',
      public: '/api/public',
      status: '/api/status',
      docs: '/api-docs'
    },
    timestamp: new Date().toISOString()
  });
});

// Ruta de estado
app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    message: 'Sistema operativo',
    status: 'online',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Ruta de estado de base de datos
app.get('/api/db-status', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({
      success: true,
      message: 'Base de datos conectada',
      database: process.env.DB_NAME || 'MenuLink'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error de conexión a base de datos',
      error: error.message
    });
  }
});

// ============================================
// MANEJO DE ERRORES
// ============================================

// 1. Middleware para rutas no encontradas (usa app.use sin parámetros)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    requested: `${req.method} ${req.originalUrl}`,
    availableEndpoints: {
      auth: ['POST /register', 'POST /login', 'GET /profile'],
      categories: ['GET /', 'POST /', 'GET /:id', 'PUT /:id', 'DELETE /:id'],
      menuItems: ['GET /', 'POST /', 'GET /:id', 'PUT /:id', 'DELETE /:id'],
      public: ['GET /restaurants', 'GET /menu/:slug'],
      system: ['GET /', 'GET /status', 'GET /db-status', 'GET /api-docs']
    },
    documentation: '/api-docs'
  });
});

// 2. Middleware de manejo de errores general (DEBE SER EL ÚLTIMO)
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  
  // Errores de Sequelize
  if (err.name && err.name.includes('Sequelize')) {
    return res.status(400).json({
      success: false,
      message: 'Error en la base de datos',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }

  // Error por defecto
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ============================================
// INICIO DEL SERVIDOR
// ============================================

const startServer = async () => {
  try {
    // Probar conexión a base de datos
    try {
      await sequelize.authenticate();
      console.log('✅ Conexión a SQL Server establecida');
    } catch (dbError) {
      console.log('⚠️  Advertencia: No se pudo conectar a la base de datos');
      console.log('   El servidor se iniciará en modo limitado');
    }

    // Iniciar servidor
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log('='.repeat(50));
      console.log('🚀 MenuLink API - Backend II');
      console.log('='.repeat(50));
      console.log(`📡 Servidor: http://localhost:${PORT}`);
      console.log(`📚 Docs:     http://localhost:${PORT}/api-docs`);
      console.log(`🗄️  DB:       ${process.env.DB_NAME || 'MenuLink'}`);
      console.log(`⏰ Inicio:   ${new Date().toLocaleString()}`);
      console.log('='.repeat(50));
    });

  } catch (error) {
    console.error('❌ Error al iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;