const User = require(`../models/User`);

const register = async (req, res, next) => {
  console.log(`Register middleware`);
  return res.status(200).json({ msg: `Register OK`, payload: req.body });
};

const login = async (req, res, next) => {
  console.log(`Login middleware`);
  return res.status(200).json({ msg: `Login OK`, payload: req.body });
};

module.exports = { register, login };
