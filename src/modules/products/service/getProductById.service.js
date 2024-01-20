const ProductModel = require('../product.model');

const getProductById = async (productId) => {
    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return { data: "Product not found", status: false, code: 404 };
        }

        return { data: product, status: true, code: 200 };
    } catch (error) {
        return { data: error.message, status: false, code: 500 };
    }
};

module.exports = getProductById;
