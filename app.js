const express = require("express");
const { connectDB } = require("./database/connect");
const app = express();
const cors = require("cors");
const tasks = require("./routes/tasks");
require("dotenv").config();
const notFound = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/error-handler");
app.use(cors());
// middleware
app.use(express.json());

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);
const start = async () => {
  try {
    await connectDB(process.env.DB_CONNECTION_STRING);
    app.listen(process.env.PORT, console.log(`App is listening...`));
  } catch (error) {
    console.log(error);
  }
};

start();
