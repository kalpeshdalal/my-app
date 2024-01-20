const CategoryModel = require('../category.model');

const getAllCategories = async () => {
    try {
        const categories = await CategoryModel.find({});
        return { data: categories, status: true, code: 200 };
    } catch (error) {
        return { data: error.message, status: false, code: 500 };
    }
};

module.exports = getAllCategories;
