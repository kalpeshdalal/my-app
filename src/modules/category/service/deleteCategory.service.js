const categoryModel = require('../category.model');

const deleteCategory = async (categoryId) => {
    try {
        const result = await categoryModel.findByIdAndDelete(categoryId);
        if (!result) {
            return { data: "Category not found", status: false, code: 404 };
        }

        return { data: "Category successfully deleted", status: true, code: 200 };
    } catch (error) {
        return { data: error.message, status: false, code: 500 };
    }
};

module.exports = deleteCategory;
