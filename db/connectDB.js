const mongoose = require(`mongoose`);

const connectDB = async (URI) => {
  console.log(`Initiating DB connection...`);
  return mongoose.connect(URI).then(() => {
    console.log(`DB connection established successfully.`);
  });
};

module.exports = connectDB;
