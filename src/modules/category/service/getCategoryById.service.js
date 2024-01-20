const CategoryModel = require('../category.model');

const getCategoryById = async (categoryId) => {
    try {
        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            return { data: "Category not found", status: false, code: 404 };
        }

        return { data: category, status: true, code: 200 };
    } catch (error) {
        return { data: error.message, status: false, code: 500 };
    }
};

module.exports = getCategoryById;
