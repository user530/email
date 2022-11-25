const jwt = require(`jsonwebtoken`);
const { UnauthorizedError } = require(`../errors`);

const authorization = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith(`Bearer`))
    throw new UnauthorizedError(`Authentication failed!`);

  const authToken = authHeader.split(` `)[1];

  // Try to get decypher the payload, write it to the request and send it next
  try {
    const { name, email, id } = jwt.verify(authToken, process.env.JWT_SECRET);

    req.user = { name, email, id };

    next();
  } catch (error) {
    throw new UnauthorizedError(`Authentication failed!`);
  }
};

module.exports = authorization;
