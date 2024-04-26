const express = require('express');
const router = express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/roles_list.js');

const customerController = require('../controllers/customerController.js')


//router.param("id", productController.checkProductId);

router.route('/').get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User), customerController.getAllCustomers).post(verifyRoles(ROLES_LIST.Admin), customerController.createCustomer);

router.route('/:id').get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User), customerController.getCustomerById).delete(verifyRoles(ROLES_LIST.Admin), customerController.deleteCustomer).put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), customerController.updateCustomer);


module.exports = router;
