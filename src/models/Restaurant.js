const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

const Restaurant = sequelize.define('Restaurant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre del restaurante es requerido' },
      len: { args: [2, 100], msg: 'El nombre debe tener entre 2 y 100 caracteres' }
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: {
      name: 'unique_restaurant_email',
      msg: 'Ya existe un restaurante con este email'
    },
    validate: {
      isEmail: { msg: 'El formato del email no es válido' },
      notEmpty: { msg: 'El email es requerido' }
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'La contraseña es requerida' },
      len: { args: [6, 255], msg: 'La contraseña debe tener al menos 6 caracteres' }
    }
  },
  slug: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: {
      name: 'unique_restaurant_slug',
      msg: 'Este slug ya está en uso'
    }
  },
  address: {
    type: DataTypes.STRING(200)
  },
  phone: {
    type: DataTypes.STRING(20)
  },
  logo_url: {
    type: DataTypes.STRING(255)
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // ⭐ NUEVOS CAMPOS PARA VERIFICACIÓN
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Si el email ha sido verificado'
  },
  verification_code: {
    type: DataTypes.STRING(6),
    allowNull: true,
    comment: 'Código de 6 dígitos para verificar email'
  },
  verification_code_expires: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Fecha de expiración del código (15 minutos)'
  },
  // ⭐ NUEVOS CAMPOS PARA RESET PASSWORD
  reset_password_token: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Token para resetear contraseña'
  },
  reset_password_expires: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Fecha de expiración del token de reset (1 hora)'
  }
}, {
  tableName: 'Restaurants',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: async (restaurant) => {
      if (restaurant.password) {
        restaurant.password = await bcrypt.hash(restaurant.password, 12);
      }
    },
    beforeUpdate: async (restaurant) => {
      if (restaurant.changed('password')) {
        restaurant.password = await bcrypt.hash(restaurant.password, 12);
      }
    }
  }
});

// Método de instancia para comparar contraseñas
Restaurant.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método para generar slug automáticamente
Restaurant.prototype.generateSlug = function() {
  return this.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

module.exports = Restaurant;