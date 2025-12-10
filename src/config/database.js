const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    dialect: config.database.dialect,
    port: config.database.port,
    logging: config.env === 'development' ? console.log : false,
    dialectOptions: {
      options: {
        encrypt: config.database.encrypt,
        trustServerCertificate: true
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a SQL Server establecida');
    return true;
  } catch (error) {
    console.error('❌ Error al conectar:', error.message);
    return false;
  }
};

module.exports = { sequelize, testConnection };