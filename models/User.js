const mongoose = require(`mongoose`);

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

module.exports = mongoose.model(`User`, UserSchema);
