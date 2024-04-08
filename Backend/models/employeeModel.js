const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.js')

const Employee = sequelize.define('Employee', {
    employee_id: {
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
    position: {
        type: DataTypes.STRING
    },
    salary: {
        type: DataTypes.DECIMAL(10, 2)
    }
}, {
    tableName: 'Employees',
    timestamps: false
});

module.exports = Employee;