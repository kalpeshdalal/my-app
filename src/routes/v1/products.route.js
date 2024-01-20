const express = require("express");
const productsController = require("../../modules/products/controller")
const auth = require("../../middlewares/auth")

const router = express.Router();


router.route('/add-product').post( productsController.addProduct);
router.route('/delete-product/:id').delete( productsController.deleteProduct);
router.route('/update-product/:id').put( productsController.updateProduct);
router.route('/get-all').get( productsController.getAllProducts);
router.route('/:id').get( productsController.getProductById);


module.exports = router;