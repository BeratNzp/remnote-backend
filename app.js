"use strict";
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors({
  origin: '*'
}));

const { success, error, validation } = require("./utils/response");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Database Connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
app.listen(port, () => {
  console.log(`remnote listening on port ${port}`);
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    })
    .then(() => console.log("Connected to the database."))
    .catch((err) => console.log(err));
});

app.use("/", require("./routes/note"));

// Error Handling
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(422).json(validation(err.message));
  }
  return error(res, err.message);
});
