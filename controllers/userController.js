const User = require(`../models/User`);
const { StatusCodes } = require(`http-status-codes`);

const register = async (req, res, next) => {
  const newUser = await User.create(req.body);

  return res
    .status(StatusCodes.CREATED)
    .json({ msg: `Register OK`, user: newUser });
};

const login = async (req, res, next) => {
  console.log(`Login middleware`);
  return res
    .status(StatusCodes.OK)
    .json({ msg: `Login OK`, payload: req.body });
};

module.exports = { register, login };
