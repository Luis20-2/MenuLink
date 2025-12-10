const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre de la categoría es requerido' },
      len: { args: [2, 100], msg: 'El nombre debe tener entre 2 y 100 caracteres' }
    }
  },
  description: {
    type: DataTypes.STRING(255)
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Restaurants',
      key: 'id'
    }
  },
  display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'Categories',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Category;