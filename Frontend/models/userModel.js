const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.js')

const User = sequelize.define('User', {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    UserName: {
      type: DataTypes.STRING
    },
    Email: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'Users',
    timestamps: false // вимкнути timestamp поля (createdAt, updatedAt)
  });
  
module.exports = User;