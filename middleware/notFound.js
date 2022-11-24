const { StatusCodes } = require(`http-status-codes`);

const notFound = (req, res, next) => {
  console.log(`!!!!!!!NOT FOUND`);

  return res
    .status(StatusCodes.NOT_FOUND)
    .send(`Route not found, try another one!`);
};

module.exports = notFound;
