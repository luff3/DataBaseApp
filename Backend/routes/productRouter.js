const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController.js')



router.route('/').get(productController.getAllProducts).post(productController.createProduct);

router.route('/:id').get(productController.getProductById).delete(productController.deleteProduct).put(productController.updateProduct)


module.exports = router;
