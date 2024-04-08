const express = require('express');
const router = express.Router();

const customerController = require('../controllers/orderController.js')


//router.param("id", productController.checkProductId);

router.route('/').get(customerController.getAllOrders).post(customerController.createOrder);

router.route('/:id').get(customerController.getOrderById).delete(customerController.deleteOrder).put(customerController.updateOrder);


module.exports = router;
