const httpStatus = require('http-status');
const catchAsync = require("../../../utils/catchAsync");
const pick = require('../../../utils/pick');
const { sendResponse } = require("../../../utils/responseHandler");
const productsServices = require("../service");

const addProduct = catchAsync(async (req, res) => {
    const {
        name,
        packSize,
        productImageUrl,
        price,
        active,
        category
    } = await pick(req.body,
        [
            "name",
            "packSize",
            "productImageUrl",
            "price",
            "active",
            "category"
        ]);
    const insertResult = await productsServices.addProduct({
        name,
        packSize,
        productImageUrl,
        price,
        active,
        category
    });
    if (insertResult.status) {
        sendResponse(res, httpStatus.OK, insertResult.data, null);

    } else {
        if (insertResult.code == 400) {
            sendResponse(res, httpStatus.BAD_REQUEST, null, insertResult.data);
        }
        else if (insertResult.code == 500) {
            sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, insertResult.data);
        }
        else {
            sendResponse(res, httpStatus.BAD_REQUEST, null, insertResult.data);
        }
    }
});

module.exports = addProduct;