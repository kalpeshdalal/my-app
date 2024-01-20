const httpStatus = require('http-status');
const catchAsync = require("../../../utils/catchAsync");
const { sendResponse } = require("../../../utils/responseHandler");
const productService = require("../service");

const getAllProducts = catchAsync(async (req, res) => {
    const productsResult = await productService.getAllProducts();

    if (productsResult.status) {
        sendResponse(res, httpStatus.OK, productsResult.data, null);
    } else {
        sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, productsResult.data);
    }
});

module.exports = getAllProducts;
