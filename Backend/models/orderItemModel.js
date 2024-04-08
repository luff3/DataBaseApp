const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.js')


const OrderItem = sequelize.define('OrderItem', {
    order_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.INTEGER
    },
    product_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'OrderItems',
    timestamps: false
});



module.exports = OrderItem;