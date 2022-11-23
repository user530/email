const mongoose = require(`mongoose`);

const connectDB = async (URI) => {
  console.log(`Initiating DB connection...`);
  return mongoose.connect(URI).await(() => {
    console.log(`DB connection established successfully.`);
  });
};

module.exports = connectDB;
