const express = require("express");
const cors = require("cors");
const routing = require("./routes/routing");
const helmet = require("helmet");
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routing);

app.listen(process.env.PORT || 8080, (err) => {
  if (!err)
    console.log(
      `Problem Server is started at port ${process.env.PORT || 8080}`
    );
  else console.log("Error in problem server setup");
});

module.exports = app;
