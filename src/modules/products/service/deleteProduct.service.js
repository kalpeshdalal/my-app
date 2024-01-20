const productModel = require('../product.model');

const deleteProduct = async (productId) => {
    try {
        const result = await productModel.findByIdAndDelete(productId);
        if (!result) {
            return { data: "Product not found", status: false, code: 404 };
        }

        return { data: "Product successfully deleted", status: true, code: 200 };
    } catch (error) {
        return { data: error.message, status: false, code: 500 };
    }
};

module.exports = deleteProduct;
