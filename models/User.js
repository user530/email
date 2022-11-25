const mongoose = require(`mongoose`);
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcryptjs`);

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Please provide the name!`],
    minLength: [2, `Name should be at least 2 character long!`],
  },
  email: {
    type: String,
    required: [true, `Please provide the email!`],
    match: [
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      `Incorrect email address!`,
    ],
    unique: [true, `Email is already in use, please another one!`],
  },
  password: {
    type: String,
    required: [true, `Please provide the password!`],
    minLength: [6, `Password should be at lease 6 characters long!`],
  },
});

// On save -> hash password
UserSchema.pre(`save`, async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Custom method to generate JWT
UserSchema.methods.generateToken = function () {
  return jwt.sign(
    { name: this.name, email: this.email, id: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// Custom method to check password
UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model(`User`, UserSchema);
