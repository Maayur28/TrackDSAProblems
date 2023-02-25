const express = require("express");
const cors = require("cors");
const requestLogger = require("./utilities/requestLogger");
const routing = require("./routes/routing");
const errorLogger = require("./utilities/errorLogger");
const helmet = require("helmet");
const app = express();
const sheet = require("./utilities/problemofday");
const axios = require("axios");
const cheerio = require("cheerio");
const addData = require("./utilities/addData");

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger);
app.use("/", routing);
app.use(errorLogger);

app.listen(process.env.PORT || 8080, (err) => {
  if (!err)
    console.log(
      `Problem Server is started at port ${process.env.PORT || 8080}`
    );
  else console.log("Error in problem server setup");
});

module.exports = app;
