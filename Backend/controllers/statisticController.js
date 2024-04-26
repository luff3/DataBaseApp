const OrderCounts = require('../models/statisticModels.js');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');


exports.getOrderCountsByMonth = async (req, res) => {
    try {
        const results = await sequelize.query('SELECT * FROM dbo.GetOrderCountsByMonth()', {
            type: Sequelize.QueryTypes.SELECT,
            model: OrderCounts
        });
        
        results.sort((a, b) => {
            if (a.MonthYear < b.MonthYear) return -1;
            if (a.MonthYear > b.MonthYear) return 1;
            return 0;
        });

        res.status(200).json(results);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            body: {
            status: 'error',
            message: 'Internal Server Error',
            },
        });
    }
};


exports.getTopSellingEmployee = async(req, res) => {
    try {
        const result = await sequelize.query("SELECT dbo.GetTopSellingEmployee() AS TopSellingEmployee", {
        type: Sequelize.QueryTypes.SELECT
    });
        console.log(result[0].TopSellingEmployee); // Виведення результату
        res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            body: {
            status: 'error',
            message: 'Internal Server Error',
            },
        });
    }
}


exports.getTotalSalesForLastMonth = async(req, res) => {
    try {
        const result = await sequelize.query('SELECT dbo.GetTotalSalesForLastMonth() AS TotalSalesForLastMonth', {
            type: Sequelize.QueryTypes.SELECT
        });
        console.log(result[0].TotalSalesForLastMonth); // Виведення результату
        res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            body: {
            status: 'error',
            message: 'Internal Server Error',
            },
        });
    }
}


exports.getMostPurchasedProduct = async(req, res) => {
    try {
        const result = await sequelize.query('SELECT dbo.GetMostPurchasedProduct() AS MostPurchasedProduct', {
            type: Sequelize.QueryTypes.SELECT
        });
        console.log(result[0].MostPurchasedProduct);
        res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            body: {
            status: 'error',
            message: 'Internal Server Error',
            },
        });
    }
}