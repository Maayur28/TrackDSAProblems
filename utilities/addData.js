const fs = require("fs");

const addData = (data) => {
  fs.appendFile("addData.txt", JSON.stringify(data, null, 2), (err) => {
    if (err) return next(err);
  });
};
module.exports = addData;
