const httpStatus = require('http-status');
const catchAsync = require("../../../utils/catchAsync");
const { sendResponse } = require("../../../utils/responseHandler");
const categoryService = require("../service");

const getCategoryById = catchAsync(async (req, res) => {
    const categoryId = req.params.id;
    const categoryResult = await categoryService.getCategoryById(categoryId);

    if (categoryResult.status) {
        sendResponse(res, httpStatus.OK, categoryResult.data, null);
    } else {
        sendResponse(res, categoryResult.code, null, categoryResult.data);
    }
});

module.exports = getCategoryById;
