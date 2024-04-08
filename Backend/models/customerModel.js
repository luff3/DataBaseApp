const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.js')

const Customer = sequelize.define('Customer', {
  customer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING
  },
  last_name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    unique: true
  }
}, {
  tableName: 'Customers',
  timestamps: false
});
module.exports = Customer;