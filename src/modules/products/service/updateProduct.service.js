const productModel = require('../product.model');

const updateProduct = async (productId, updateData) => {
    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return { data: "Product not found", status: false, code: 404 };
        }

        Object.assign(product, updateData);
        await product.save();

        return { data: product, status: true, code: 200 };
    } catch (error) {
        return { data: error.message, status: false, code: 500 };
    }
};

module.exports = updateProduct;
