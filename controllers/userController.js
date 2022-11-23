const User = require(`../models/User`);

const register = async (req, res, next) => {
  console.log(`Register`);
};

const login = async (req, res, next) => {
  console.log(`Login`);
};

module.exports = { register, login };
