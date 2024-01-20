const httpStatus = require('http-status');
const catchAsync = require("../../../utils/catchAsync");
const { sendResponse } = require("../../../utils/responseHandler");
const categoryService = require("../service");

const getAllCategories = catchAsync(async (req, res) => {
    const categoriesResult = await categoryService.getAllCategories();

    if (categoriesResult.status) {
        sendResponse(res, httpStatus.OK, categoriesResult.data, null);
    } else {
        sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, categoriesResult.data);
    }
});

module.exports = getAllCategories;
