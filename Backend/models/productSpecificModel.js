const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const ProductSpecifics = sequelize.define('ProductSpecifics', {
    product_specific_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    color_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    size_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'ProductSpecifics',
    timestamps: false // Якщо час створення та оновлення не зберігаються в базі даних
});

module.exports = ProductSpecifics;
