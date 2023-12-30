/**
 * @fileoverview
 * This file defines a utility function for sending HTTP responses in a standardized format.
 * The function, sendResponse, takes parameters for Express.js response object, HTTP status code,
 * response data, and an optional error object. It then sends a JSON response with the specified
 * status code, along with additional information about the response status and the provided data or error.
 */

/**
 * Sends an HTTP response using the provided Express.js response object.
 *
 * @param {object} res - The Express.js response object.
 * @param {number} status - The HTTP status code to be sent in the response.
 * @param {object} data - The data to be included in the response body.
 * @param {object|null} err - An optional error object. If provided, it indicates that the response
 *                            should be treated as an error response.
 */
function sendResponse(res, status, data, err = null) {
  if (err) {
    // If an error object is provided, send an error response with details.
    res.status(status).json({
      code: status,
      status: status > 199 && status < 299 ? true : false,
      data: err,
    });
  } else {
    // If no error, send a success response with the provided data.
    res.status(status).json({
      code: status,
      status: status > 199 && status < 299 ? true : false,
      data,
    });
  }
}

// Export the sendResponse function for use in other modules.
module.exports.sendResponse = sendResponse;
