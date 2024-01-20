const httpStatus = require('http-status');
const catchAsync = require("../../../utils/catchAsync");
const { sendResponse } = require("../../../utils/responseHandler");
const productService = require("../service");

const getProductById = catchAsync(async (req, res) => {
    const productId = req.params.id;
    const productResult = await productService.getProductById(productId);

    if (productResult.status) {
        sendResponse(res, httpStatus.OK, productResult.data, null);
    } else {
        sendResponse(res, productResult.code, null, productResult.data);
    }
});

module.exports = getProductById;
