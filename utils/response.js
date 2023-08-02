const { getTimeStamp } = require('./functions');

/**
 * @desc    This file contain Success and Error response for sending to client / user
 * @author  Huda Prasetyo
 * @since   2020
 */

/**
 * @desc    Send any success response
 *
 * @param   {number} statusCode
 * @param   {string | object | array} message
 * @param   {object | array} data
 */
exports.success = (statusCode, message, data) => {
  if (!data) {
    data = null;
  } else {
    data = data;
  }
  return {
    error: false,
    code: statusCode,
    timestamp: getTimeStamp(),
    message,
    data
  };
};

/**
 * @desc    Send any error response
 *
 * @param   {number} statusCode
 * @param   {string | object | array} message
 */
exports.error = (statusCode, message) => {
  // List of common HTTP request code
  const codes = [400, 401, 403, 404, 409, 422, 500];

  // Get matched code
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  return {
    error: true,
    code: statusCode,
    timestamp: getTimeStamp(),
    message,
    data: null
  };
};

/**
 * @desc    Send any validation response
 *
 * @param   {string | object | array} message
 * @param   {object | array} errors
 */
exports.validation = (message, errors) => {
  if (!message) {
    message = "Validation error";
  } else {
    message = message;
  }
  return {
    error: true,
    code: 422,
    timestamp: getTimeStamp(),
    message: "Validation error",
    errors,
    data: null
  };
};