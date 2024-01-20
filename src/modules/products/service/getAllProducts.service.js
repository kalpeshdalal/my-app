const ProductModel = require('../product.model');

const getAllProducts = async () => {
    try {
        const products = await ProductModel.find({});
        return { data: products, status: true, code: 200 };
    } catch (error) {
        return { data: error.message, status: false, code: 500 };
    }
};

module.exports = getAllProducts;
