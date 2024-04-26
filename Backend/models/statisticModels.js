const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const OrderCounts = sequelize.define('OrderCounts', {
    MonthYear: DataTypes.STRING,
    OrderCount: DataTypes.INTEGER
});


module.exports = OrderCounts;