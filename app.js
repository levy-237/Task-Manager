const express = require("express");
const { connectDB } = require("./database/connect");
const app = express();
const cors = require("cors");
const tasks = require("./routes/tasks");
require("dotenv").config();
app.use(cors());
// middleware
// app.use(express.static("./public"))
app.use(express.json());

app.use("/api/v1/tasks", tasks);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.DB_CONNECTION_STRING);
    app.listen(3000, console.log(`Listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();