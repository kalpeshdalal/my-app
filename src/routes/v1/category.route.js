const express = require("express");
const categoryController = require("../../modules/category/controller")
const auth = require("../../middlewares/auth")

const router = express.Router();

router.route('/add-category').post( categoryController.addCategory);
router.route('/delete-category/:id').delete( categoryController.deleteCategory);
router.route('/update-category/:id').put( categoryController.updateCategory);
router.route('/get-all').get( categoryController.getAllCategories);
router.route('/:id').get( categoryController.getCategoryById);



module.exports = router;