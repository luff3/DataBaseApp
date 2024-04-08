const express = require('express');
const router = express.Router();

const customerController = require('../controllers/loginController.js')


//router.param("id", productController.checkProductId);

router.route('/').post(customerController.checkLogin);



module.exports = router;
