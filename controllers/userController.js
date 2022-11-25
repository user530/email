const User = require(`../models/User`);
const { StatusCodes } = require(`http-status-codes`);
const { NotFoundError, UnauthorizedError } = require(`../errors`);

const register = async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = newUser.generateToken();

  return res
    .status(StatusCodes.CREATED)
    .json({ user: { name: newUser.name }, token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new NotFoundError(`Provide valid email and password`);

  const foundUser = User.findOne({ email });

  if (!foundUser) throw new UnauthorizedError(`Wrong credentials`);

  const verified = User.checkPassword(password);

  if (!verified) throw new UnauthorizedError(`Wrong password`);

  const token = User.generateToken();

  return res
    .status(StatusCodes.OK)
    .json({ user: { name: foundUser.name }, token });
};

module.exports = { register, login };
