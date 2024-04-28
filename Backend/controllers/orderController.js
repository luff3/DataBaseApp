const Order = require('../models/orderModel.js')
const path = require('path');
const fs = require('fs');

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();

        const responseBody = orders.map((order) => ({
            order_id: order.order_id,
            customer_id: order.customer_id,
            employee_id: order.employee_id,
            total_amount: order.total_amount,
            order_date: order.order_date,
        }));
        
        const jsonContent = JSON.stringify(responseBody, null, 2);

        const filePath = path.join(__dirname, '../documents/orders.json');
    
        fs.writeFileSync(filePath, jsonContent);

        res.status(200).json(responseBody);
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


exports.getOrderById = async (req, res) => {
    try {
        const orderID = req.params.id;
        console.log(`Getting order with ID: ${orderID}`);
    
        if (isNaN(orderID)) {
            return res.status(400).json({
                error: 'Invalid orderID. Must be a number.',
            });
        }
    
        const order = await Order.findByPk(orderID);
    
        if (!order) {
            return res.status(404).json({
                error: 'Order not found.',
            });
        }
        const responseBody = {
            order_id: order.order_id,
            customer_id: order.customer_id,
            employee_id: order.employee_id,
            total_amount: order.total_amount,
            order_date: order.order_date,
        };
    
        
        res.status(200).json(responseBody);
    }catch (error) {
    
        console.error('Error:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};



exports.createOrder = async (req, res) => {
    try {
        console.log('Creating a new order');
        console.log(req.body);
        const { customer_id, employee_id, total_amount, order_date} = req.body;
        if (!customer_id || !employee_id || !total_amount || !order_date) {
            return res.status(400).json({
                error: 'Something is missing',
            });
        }
    
        const newOrder = await Order.create({
           // order_id,
            customer_id,
            employee_id,
            total_amount,
            order_date,
        },{
            fields: [ 'customer_id', 'employee_id', 'total_amount', 'order_date']
        });
    
        const responseBody = {
            order_id: newOrder.order_id,
            customer_id: newOrder.customer_id,
            employee_id: newOrder.employee_id,
            total_amount: newOrder.total_amount,
            order_date: newOrder.order_date,
        };
    
        res.status(201).json(responseBody);
    
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};


exports.deleteOrder= async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json('Order not found');
        }
        await order.destroy();
        return res.status(204).json('Successfully deleted');
    } catch (error) {
        console.error('Error deleting order:', error);
        return res.status(500).json('Internal Server Error');
    }
    
};


exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { customer_id, employee_id, total_amount, order_date} = req.body;
    
    
        const order = await Order.findByPk(orderId);
        
        order.customer_id = customer_id;
        order.employee_id = employee_id;
        order.total_amount = total_amount;
        order.order_date = order_date;
    
        await order.save();
    
        return res.status(200).json({
            order_id: order.order_id,
            customer_id: order.customer_id,
            employee_id: order.employee_id,
            total_amount: order.total_amount,
            order_date: order.order_date,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};