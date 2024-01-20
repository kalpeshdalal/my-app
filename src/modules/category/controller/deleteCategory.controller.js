const httpStatus = require('http-status');
const catchAsync = require("../../../utils/catchAsync");
const { sendResponse } = require("../../../utils/responseHandler");
const categoryServices = require("../service");

const deleteCategory = catchAsync(async (req, res) => {
    const categoryId = req?.params?.id;

    const deleteResult = await categoryServices.deleteCategory(categoryId);

    if (deleteResult.status) {
        sendResponse(res, httpStatus.OK, deleteResult.data, null);
    } else {
        sendResponse(res, httpStatus.BAD_REQUEST, null, deleteResult.data);
    }
});

module.exports = deleteCategory;
