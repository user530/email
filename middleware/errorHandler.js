const { StatusCodes } = require(`http-status-codes`);

const errorHandler = (err, req, res, next) => {
  let customError = {
    message: err.message || `Something went wrong, try again later!`,
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  //   Catch Validation errors
  if (err.name === `ValidationError`) {
    {
      customError.message = Object.values(err.errors)
        .map((errObj) => errObj.message)
        .join(`, `);
      customError.status = StatusCodes.BAD_REQUEST;
    }
  }

  // Handle unique value errors
  if (err.code && err.code === 11000) {
    customError.message = `Values of: ${Object.keys(err.keyValue).join(
      `, `
    )} - already taken, please use unique values for this fields`;
    customError.status = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.status).json({ msg: customError.message });
};

module.exports = errorHandler;
