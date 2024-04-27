const express = require('express');
const router = express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/roles_list.js');

const productSpecificController = require('../controllers/productSpecController.js')


//router.param("id", productController.checkProductId);

router.route('/').get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User), productSpecificController.getAllProdSpec).post(verifyRoles(ROLES_LIST.Admin), productSpecificController.createProdSpec);

router.route('/:id').get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User), productSpecificController.getProdSpecById).delete(verifyRoles(ROLES_LIST.Admin), productSpecificController.deleteProdSpec).put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), productSpecificController.updateProdSpec);


module.exports = router;
