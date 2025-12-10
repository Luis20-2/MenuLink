const { sequelize } = require('../config/database');

// Importar modelos
const Restaurant = require('./Restaurant');
const Category = require('./Category');
const MenuItem = require('./MenuItem');

// Definir relaciones
// 1. Un restaurante tiene muchas categorías
Restaurant.hasMany(Category, {
  foreignKey: 'restaurant_id',
  as: 'categories',
  onDelete: 'CASCADE'
});

// 2. Una categoría pertenece a un restaurante
Category.belongsTo(Restaurant, {
  foreignKey: 'restaurant_id',
  as: 'restaurant'
});

// 3. Una categoría tiene muchos items de menú
Category.hasMany(MenuItem, {
  foreignKey: 'category_id',
  as: 'menuItems',
  onDelete: 'CASCADE'
});

// 4. Un item de menú pertenece a una categoría
MenuItem.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category'
});

// 5. Un restaurante tiene muchos items de menú
Restaurant.hasMany(MenuItem, {
  foreignKey: 'restaurant_id',
  as: 'menuItems',
  onDelete: 'CASCADE'
});

// 6. Un item de menú pertenece a un restaurante
MenuItem.belongsTo(Restaurant, {
  foreignKey: 'restaurant_id',
  as: 'restaurant'
});

// Exportar todos los modelos
module.exports = {
  sequelize,
  Restaurant,
  Category,
  MenuItem
};