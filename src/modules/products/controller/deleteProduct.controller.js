const httpStatus = require('http-status');
const catchAsync = require("../../../utils/catchAsync");
const { sendResponse } = require("../../../utils/responseHandler");
const productsServices = require("../service");

const deleteProduct = catchAsync(async (req, res) => {
    const productId = req?.params?.id;

    const deleteResult = await productsServices.deleteProduct(productId);

    if (deleteResult.status) {
        sendResponse(res, httpStatus.OK, deleteResult.data, null);
    } else {
        sendResponse(res, httpStatus.BAD_REQUEST, null, deleteResult.data);
    }
});

module.exports = deleteProduct;
