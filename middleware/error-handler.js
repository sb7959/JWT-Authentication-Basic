/* const CustomAPIError = require('../errors/custom-error')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(500).send('Something went wrong try again later')
}

module.exports = errorHandlerMiddleware
 */

const { CustomAPIError } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    //console.log("inside error handler MIDDLEWARE");
    return res.status(err.statuscode).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "somthing went wrong please try again" });
};

module.exports = errorHandlerMiddleware;
