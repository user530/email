require(`dotenv`).config();

const express = require(`express`);
const app = express();

require(`express-async-errors`);

app.use(express.json());
app.use(express.static(`./public`));

const userRouter = require(`./routes/userRouter`);
app.use(`/`, userRouter);

// Test authorization and email
const authorization = require(`./middleware/authorization`);
const sendEmail = require(`./controllers/email`);
app.get(`/send`, authorization, sendEmail);

const errorHandler = require(`./middleware/errorHandler`);
const notFound = require(`./middleware/notFound`);

app.use(notFound);
app.use(errorHandler);

const connect = require(`./db/connectDB`);

const port = process.env.PORT || app.listen();

const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, async () =>
      console.log(`App is up and running at port ${port}...`)
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
