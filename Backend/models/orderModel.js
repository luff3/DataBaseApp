const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.js')


const Order = sequelize.define('Order', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    customer_id: {
        type: DataTypes.INTEGER
    },
    employee_id: {
        type: DataTypes.INTEGER
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2)
    },
    order_date: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'Orders',
    timestamps: false
});


module.exports = Order;