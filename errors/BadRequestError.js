const CustomError = require(`./CustomError`);
const { StatusCodes } = require(`http-status-codes`);

class BadRequestErr extends CustomError {
  constructor(msg) {
    super(msg);
    this.status = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestErr;
