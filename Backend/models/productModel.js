const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.js')


const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        type: DataTypes.STRING,
        unique: true
    },
    amount: {
        type: DataTypes.INTEGER
    },
    product_specific_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'ProductSpecifics',
            key: 'product_specific_id'
        }
    },
    supplier_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Suppliers',
            key: 'supplier_id'
        }
    }
}, {
    tableName: 'Products',
    timestamps: false
});

module.exports = Product;