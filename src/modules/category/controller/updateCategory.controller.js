const httpStatus = require('http-status');
const catchAsync = require("../../../utils/catchAsync");
const pick = require('../../../utils/pick');
const { sendResponse } = require("../../../utils/responseHandler");
const categoryServices = require("../service");

const updateCategory = catchAsync(async (req, res) => {
    const categoryId = req?.params?.id; 
    const updateData = pick(req.body, ["name", "description","active"]);

    const updateResult = await categoryServices.updateCategory(categoryId, updateData);

    if (updateResult.status) {
        sendResponse(res, httpStatus.OK, updateResult.data, null);
    } else {
        sendResponse(res, httpStatus.BAD_REQUEST, null, updateResult.data);
    }
});

module.exports = updateCategory;
