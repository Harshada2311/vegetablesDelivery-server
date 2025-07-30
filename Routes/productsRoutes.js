const express = require('express')

const router = express.Router();
const productsController = require('../Controllers/productsController');

router.get('/products',productsController.getAllproducts);

router.get('/products/:id',productsController.getAllproductsById);

router.get('/products/name/:name',productsController.getProductsByName);

router.get('/products/getProductsByCategory/:category',productsController.getProductsByCategory);
router.get('/products/getProductsByCity/:city',productsController.getProductsByCity);

module.exports = router;