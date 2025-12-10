require('dotenv').config();

const config = {
  // Entorno
  env: process.env.NODE_ENV || 'development',
  
  // Servidor
  port: process.env.PORT || 3000,
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  
  // Base de datos
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 1433,
    name: process.env.DB_NAME || 'MenuLink',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD,
    encrypt: process.env.DB_ENCRYPT === 'true',
    dialect: 'mssql'
  },
  
  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'default_secret_change_me',
    expiresIn: '24h',
    algorithm: 'HS256'
  },
  
  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  },
  
  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'app.log'
  }
};

// Validar configuración crítica
if (!config.database.password) {
  console.error('❌ DB_PASSWORD no está configurado en .env');
  process.exit(1);
}

if (config.jwt.secret === 'default_secret_change_me') {
  console.warn('⚠️  JWT_SECRET está usando el valor por defecto. Cambia en producción.');
}

module.exports = config;