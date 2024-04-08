const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController.js')


//router.param("id", productController.checkProductId);

router.route('/').get(customerController.getAllCustomers).post(customerController.createCustomer);

router.route('/:id').get(customerController.getCustomerById).delete(customerController.deleteCustomer).put(customerController.updateCustomer);


module.exports = router;
