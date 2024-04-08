const express = require('express');
const router = express.Router();

const customerController = require('../controllers/employeeController.js')


//router.param("id", productController.checkProductId);

router.route('/').get(customerController.getAllEmployees).post(customerController.createEmployee);

router.route('/:id').get(customerController.getEmployeeById).delete(customerController.deleteEmployee).put(customerController.updateEmployee);


module.exports = router;
