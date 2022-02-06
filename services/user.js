const validator = require("../utilities/validate");
const model = require("../models/user");
const sheet = require("../utilities/fraz");
let userService = {};

userService.getProblems = async (userid) => {
  return await model.getProblems(userid);
};

userService.addtoProblem = async (obj) => {
  return await model.addtoProblem(obj);
};
userService.getfromOrder = async (userid) => {
  // if (validator.getfromOrder(userid))
  if (true) return await model.getfromOrder(userid);
  else {
    let err = new Error();
    err.status = 400;
    err.message = "Item not found,Please check the item and try again";
    throw err;
  }
};
userService.getLoveBabbarSheet = async () => {
  return await model.getLoveBabbarSheet();
};
userService.getStriverSheet = async () => {
  return await model.getStriverSheet();
};
userService.getFrazSheet = async () => {
  return await model.getFrazSheet();
};
userService.getProbOfTheDay = async (cache) => {
  return await model.getProbOfTheDay(cache);
};
userService.editProblem = async (obj) => {
  return await model.editProblem(obj);
};
userService.deleteProblem = async (obj) => {
  return await model.deleteProblem(obj);
};
module.exports = userService;
