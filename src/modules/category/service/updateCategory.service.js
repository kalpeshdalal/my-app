const categoryModel = require('../category.model');

const updateCategory = async (categoryId, updateData) => {
    try {
        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return { data: "Category not found", status: false, code: 404 };
        }

        Object.assign(category, updateData);
        await category.save();

        return { data: category, status: true, code: 200 };
    } catch (error) {
        return { data: error.message, status: false, code: 500 };
    }
};

module.exports = updateCategory;
