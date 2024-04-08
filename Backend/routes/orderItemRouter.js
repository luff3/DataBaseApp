const express = require('express');
const router = express.Router();

const customerController = require('../controllers/orderItemController.js')


//router.param("id", productController.checkProductId);

router.route('/').get(customerController.getAllOrderItems).post(customerController.createOrderItem);

router.route('/:id').get(customerController.getOrderItemById).delete(customerController.deleteOrderItem).put(customerController.updateOrderItem);


module.exports = router;
