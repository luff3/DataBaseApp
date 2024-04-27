const OrderItem = require('../models/orderItemModel.js');


exports.getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.findAll();

        const responseBody = orderItems.map((orderItem) => ({
            order_item_id: orderItem.order_item_id,
            order_id: orderItem.order_id,
            product_id: orderItem.product_id,
        }));
        
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


exports.getOrderItemById = async (req, res) => {
    try {
        const orderItemId = req.params.id;
        console.log(`Getting order with ID: ${orderItemId}`);
    
        if (isNaN(orderItemId)) {
            return res.status(400).json({
                error: 'Invalid orderItemId. Must be a number.',
            });
        }
    
        const orderItem = await OrderItem.findByPk(orderItemId);
    
        if (!orderItem) {
            return res.status(404).json({
                error: 'OrderItem not found.',
            });
        }
        const responseBody = {
            order_item_id: orderItem.order_item_id,
            order_id: orderItem.order_id,
            product_id: orderItem.product_id,
        };
    
        
        res.status(200).json(responseBody);
    }catch (error) {
    
        console.error('Error:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};



exports.createOrderItem = async (req, res) => {
    try {
        console.log('Creating a new orderItem');
        console.log(req.body);

        // const { order_item_id } = req.body;
        // const orderItemID = order_item_id.order_item_id;
        const { order_id, product_id} = req.body;
        console.log(order_id, product_id);

        if ( !order_id || !product_id) {
            return res.status(400).json({
                error: 'Something is missing',
            });
        }
    
        const newOrderItem = await OrderItem.create({
            order_id,
            product_id,
        }, { fields: ['order_id', 'product_id'], returning: false, hasTrigger: true });
        
    
        res.status(201).json(newOrderItem);
    
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};


exports.deleteOrderItem= async (req, res) => {
    try {
        const orderItemId = req.params.id;
        const order = await OrderItem.findByPk(orderItemId);
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


exports.updateOrderItem = async (req, res) => {
    try {
        const orderItemId = req.params.id;
        const { order_id, product_id} = req.body;
    
    
        const orderItem = await OrderItem.findByPk(orderItemId);
        
        orderItem.order_id = order_id;
        orderItem.product_id = product_id;

    
        await orderItem.save();
    
        return res.status(200).json({
            order_item_id: orderItem.order_item_id,
            order_id: orderItem.order_id,
            product_id: orderItem.product_id,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};