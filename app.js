require(`dotenv`).config();
require(`express-async-errors`);

const express = require(`express`);
const app = express();

app.use(express.json());
app.use(express.static(`./public`));

const userRouter = require(`./routes/userRouter`);
app.use(`/`, userRouter);

const port = process.env.PORT || app.listen();

app.listen(port, async () => {
  try {
    console.log(`App is up and running at port ${port}...`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
