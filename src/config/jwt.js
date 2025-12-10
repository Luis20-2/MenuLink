require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET || 'default_secret_change_in_production',
  expiresIn: '24h',
  algorithm: 'HS256'
};