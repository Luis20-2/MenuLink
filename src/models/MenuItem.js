const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MenuItem = sequelize.define('MenuItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre del platillo es requerido' },
      len: { args: [2, 100], msg: 'El nombre debe tener entre 2 y 100 caracteres' }
    }
  },
  description: {
    type: DataTypes.STRING(255)
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: { msg: 'El precio debe ser un número decimal' },
      min: { args: [0], msg: 'El precio no puede ser negativo' }
    }
  },
  image_url: {
    type: DataTypes.STRING(255)
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id'
    }
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Restaurants',
      key: 'id'
    }
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'MenuItems',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeValidate: (menuItem) => {
      if (menuItem.price) {
        menuItem.price = parseFloat(menuItem.price).toFixed(2);
      }
    }
  }
});

module.exports = MenuItem;