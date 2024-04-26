const express = require('express');
const router = express.Router();

const statisticController = require('../controllers/statisticController.js')


//router.param("id", productController.checkProductId);

router.route('/').get(statisticController.getOrderCountsByMonth);
router.route('/employee').get(statisticController.getTopSellingEmployee);
router.route('/lastMonth').get(statisticController.getTotalSalesForLastMonth);
router.route('/mostPopular').get(statisticController.getMostPurchasedProduct);


module.exports = router;
