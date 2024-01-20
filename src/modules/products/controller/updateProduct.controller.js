const httpStatus = require('http-status');
const catchAsync = require("../../../utils/catchAsync");
const pick = require('../../../utils/pick');
const { sendResponse } = require("../../../utils/responseHandler");
const productsServices = require("../service");

const updateProduct = catchAsync(async (req, res) => {
    const productId = req?.params?.id; 
    const updateData = await pick(req.body, [
        "name",
        "packSize",
        "productImageUrl",
        "price",
        "active",
        "category"
    ]);

    const updateResult = await productsServices.updateProduct(productId, updateData);

    if (updateResult.status) {
        sendResponse(res, httpStatus.OK, updateResult.data, null);
    } else {
        sendResponse(res, httpStatus.BAD_REQUEST, null, updateResult.data);
    }
});

module.exports = updateProduct;
