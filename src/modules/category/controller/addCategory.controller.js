const httpStatus = require('http-status');
const catchAsync = require("../../../utils/catchAsync");
const { sendResponse } = require("../../../utils/responseHandler");
const categoryService = require("../service");
const pick = require('../../../utils/pick');

const addCategory = catchAsync(async (req, res) => {
    const {
        name,
        description,
        active,
    } = await pick(req.body,
        [
            "name",
            "description",
            "active",
        ]);

    const addResult = await categoryService.addCategory({name,
        description,
        active,});

    if (addResult.status) {
        sendResponse(res, httpStatus.CREATED, addResult.data, null);
    } else {
        sendResponse(res, httpStatus.BAD_REQUEST, null, addResult.data);
    }
});

module.exports = addCategory;
