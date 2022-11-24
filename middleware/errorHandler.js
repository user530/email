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

  return res.status(customError.status).json({ msg: customError.message });
};

module.exports = errorHandler;
