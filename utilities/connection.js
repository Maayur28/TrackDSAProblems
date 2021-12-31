const mongoose = require("mongoose");
const sheet = require("./problemofday");
mongoose.Promise = global.Promise;
require("dotenv").config();

const url = process.env.URL;
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const prodSchema = mongoose.Schema({
  // id: { type: String },
  title: { type: String, required: [true, "Title is required"] },
  topic: { type: [String], required: [true, "Topic is required"] },
  status: { type: Boolean, default: false },
  difficulty: { type: String, required: [true, "Difficulty is required"] },
  note: { type: String, default: "" },
  url: { type: String, default: "" },
  time: { type: Date, default: Date.now },
});
const sheetloveBabbarSchema = mongoose.Schema({
  title: { type: String, required: [true, "Title is required"] },
  topic: { type: [String], required: [true, "Topic is required"] },
  status: { type: Boolean, default: false },
  difficulty: { type: String },
  note: { type: String, default: "" },
  url: { type: String, default: "" },
});
const sheetStriverSchema = mongoose.Schema({
  title: { type: String, required: [true, "Title is required"] },
  topic: { type: [String], required: [true, "Topic is required"] },
  status: { type: Boolean, default: false },
  difficulty: { type: String },
  note: { type: String, default: "" },
  url: { type: String, default: "" },
});
const sheetFrazSchema = mongoose.Schema({
  title: { type: String, required: [true, "Title is required"] },
  topic: { type: [String], required: [true, "Topic is required"] },
  status: { type: Boolean, default: false },
  difficulty: { type: String },
  note: { type: String, default: "" },
  url: { type: String, default: "" },
});
const proboftheDaySchema = mongoose.Schema({
  title: { type: String, required: [true, "Title is required"] },
  topic: { type: [String] },
  status: { type: Boolean, default: false },
  difficulty: { type: String },
  note: { type: String, default: "" },
  url: { type: String, default: "" },
});
const probtimeSchema = mongoose.Schema({
  time: { type: String, default: "" },
  problems: [proboftheDaySchema],
  current: [proboftheDaySchema],
});
const prodtotalSchema = mongoose.Schema({
  userid: { type: String, required: [true, "userid is required"] },
  problems: [prodSchema],
});
let connection = {};
connection.getProductConnection = async () => {
  try {
    let dbConnection = await mongoose.connect(url, options);
    let model = dbConnection.model("Problems", prodtotalSchema, "problems");
    return model;
  } catch (error) {
    let err = new Error(
      "Could not establish connection with DSAtracker database"
    );
    err.status = 500;
    throw err;
  }
};
connection.getProblemsOfTheDayConnection = async () => {
  try {
    let dbConnection = await mongoose.connect(url, options);
    let model = dbConnection.model(
      "ProblemsOfTheDay",
      probtimeSchema,
      "problemsofthday"
    );
    return model;
  } catch (error) {
    let err = new Error(
      "Could not establish connection with DSAtracker database"
    );
    err.status = 500;
    throw err;
  }
};
connection.getloveBabbarSheetConnection = async () => {
  try {
    let dbConnection = await mongoose.connect(url, options);
    let model = dbConnection.model(
      "loveBabbarSheet",
      sheetloveBabbarSchema,
      "LoveBabbarSheet"
    );
    return model;
  } catch (error) {
    let err = new Error(
      "Could not establish connection with DSAtracker database"
    );
    err.status = 500;
    throw err;
  }
};
connection.getStriverSheetConnection = async () => {
  try {
    let dbConnection = await mongoose.connect(url, options);
    let model = dbConnection.model(
      "striverSheet",
      sheetStriverSchema,
      "StriverSheet"
    );
    return model;
  } catch (error) {
    let err = new Error(
      "Could not establish connection with DSAtracker database"
    );
    err.status = 500;
    throw err;
  }
};
connection.getFrazSheetConnection = async () => {
  try {
    let dbConnection = await mongoose.connect(url, options);
    let model = dbConnection.model("frazSheet", sheetFrazSchema, "FrazSheet");
    return model;
  } catch (error) {
    let err = new Error(
      "Could not establish connection with DSAtracker database"
    );
    err.status = 500;
    throw err;
  }
};
connection.addSheet = async () => {
  let model = await connection.getProblemsOfTheDayConnection();
  await model.deleteMany({});
  //await model.create(sheet.problemsOfTheDay);
  let arr = [
    {
      topic: "Array",
      title: "Find the maximum and minimum element in an array",
      status: false,
      note: "",
      url: "https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/",
      difficulty: "1",
    },
    {
      topic: "Array",
      title: 'Find the "Kth" max and min element of an array ',
      status: false,
      note: "",
      url: "https://practice.geeksforgeeks.org/problems/kth-smallest-element/0",
      difficulty: "2",
    },
    {
      topic: "Array",
      title: "Kadane's Algo [V.V.V.V.V IMP]",
      status: false,
      note: "",
      url: "https://practice.geeksforgeeks.org/problems/kadanes-algorithm/0",
      difficulty: "3",
    },
  ];
  await model.create({ problems: sheet.problemsOfTheDay, current: arr });
};

module.exports = connection;
