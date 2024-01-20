const CategoryModel = require('../category.model');

const addCategory = async (categoryData) => {
    try {
        // const category = new CategoryModel(categoryData);
        const addResult = await CategoryModel.create({ ...categoryData });
        if (addResult) {
            return { data: addResult, status: true, code: 200 };
         }
         else {
             return { data: "Can not add category", status: false, code: 400 };
         }
    } catch (error) {
        return { data: error.message, status: false, code: 500 };
    }
};

module.exports = addCategory;
