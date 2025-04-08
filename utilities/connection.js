const mongoose = require("mongoose");
const sheet = require("./problemofday");
const moment = require("moment");
mongoose.Promise = global.Promise;
require("dotenv").config();

const url = process.env.MONGODB_URI;


const prodSchema = mongoose.Schema({
  // id: { type: String },
  title: { type: String, required: [true, "Title is required"] },
  topic: { type: [String], required: [true, "Topic is required"] },
  status: { type: Boolean, default: false },
  difficulty: { type: String, required: [true, "Difficulty is required"] },
  note: { type: String, default: "" },
  url: { type: String, default: "" },
  time: {
    type: String,
    default: moment().utcOffset("+05:30").format("MMMM Do YYYY, h:mm:ss a"),
  },
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
const noteSchema = mongoose.Schema({
  title: { type: String, required: [true, "Title is required"] },
  note: { type: String, default: "" },
  group: { type: String, default: "" },
  time: { type: Date, default: Date.now },
});
const notetotalSchema = mongoose.Schema({
  userid: { type: String, required: [true, "userid is required"] },
  notes: [noteSchema],
});
let connection = {};
connection.getProductConnection = async () => {
  try {
    let dbConnection = await mongoose.connect(url);
    let model = dbConnection.model("Problems", prodtotalSchema,"Problems");
    return model;
  } catch (error) {
    let err = new Error(
      "Could not establish connection with database"
    );
    err.status = 500;
    throw err;
  }
};

connection.getNoteConnection = async () => {
  try {
    let dbConnection = await mongoose.connect(url);
    let model = dbConnection.model("Notes", notetotalSchema,"Notes");
    return model;
  } catch (error) {
    let err = new Error(
      "Could not establish connection with database"
    );
    err.status = 500;
    throw err;
  }
};

connection.getProblemsOfTheDayConnection = async () => {
  try {
    let dbConnection = await mongoose.connect(url);
    let model = dbConnection.model(
      "ProblemsOfTheDay",
      probtimeSchema,
      "ProblemsOfTheDay"
    );
    return model;
  } catch (error) {
    console.error("Mongoose connection error:", error);
    let err = new Error(
      "Could not establish connection with database"
    );
    err.status = 500;
    throw err;
  }
};
connection.getloveBabbarSheetConnection = async () => {
  try {
    let dbConnection = await mongoose.connect(url);
    let model = dbConnection.model(
      "LoveBabbarSheet",
      sheetloveBabbarSchema,
      "LoveBabbarSheet"
    );
    return model;
  } catch (error) {
    let err = new Error(
      "Could not establish connection with database"
    );
    err.status = 500;
    throw err;
  }
};
connection.getStriverSheetConnection = async () => {
  try {
    let dbConnection = await mongoose.connect(url);
    let model = dbConnection.model(
      "StriverSheet",
      sheetStriverSchema,
      "StriverSheet"
    );
    return model;
  } catch (error) {
    let err = new Error(
      "Could not establish connection with database"
    );
    err.status = 500;
    throw err;
  }
};
connection.getFrazSheetConnection = async () => {
  try {
    let dbConnection = await mongoose.connect(url);
    let model = dbConnection.model("FrazSheet", sheetFrazSchema,"FrazSheet");
    return model;
  } catch (error) {
    let err = new Error(
      "Could not establish connection with database"
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
