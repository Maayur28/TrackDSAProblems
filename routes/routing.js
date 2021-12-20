const express = require("express");
const routes = express.Router();
const service = require("../services/user");
require("dotenv").config();

routes.get("/getproblems/:userid", async (req, res, next) => {
  try {
    let totalproblem = await service.getProblems(req.params.userid);
    res.json({ totalproblem }).status(200);
  } catch (error) {
    next(error);
  }
});
routes.post("/addproblem", async (req, res, next) => {
  try {
    let totalproblem = await service.addtoProblem(req.body);
    res.json({ totalproblem }).status(200);
  } catch (error) {
    next(error);
  }
});
routes.get("/lovebabbar", async (req, res, next) => {
  try {
    let totalProblem = await service.getLoveBabbarSheet();
    res.json({ totalProblem }).status(200);
  } catch (error) {
    next(error);
  }
});
routes.get("/striver", async (req, res, next) => {
  try {
    let totalProblem = await service.getStriverSheet();
    res.json({ totalProblem }).status(200);
  } catch (error) {
    next(error);
  }
});
routes.get("/fraz", async (req, res, next) => {
  try {
    let totalProblem = await service.getFrazSheet();
    res.json({ totalProblem }).status(200);
  } catch (error) {
    next(error);
  }
});
routes.get("/problemoftheday", async (req, res, next) => {
  try {
    let totalproblem = await service.getProbOfTheDay();
    res.json({ totalproblem }).status(200);
  } catch (error) {
    next(error);
  }
});
routes.put("/editproblem", async (req, res, next) => {
  try {
    let totalproblem = await service.editProblem(req.body);
    res.json({ totalproblem }).status(200);
  } catch (error) {
    next(error);
  }
});
routes.delete("/deleteproblem", async (req, res, next) => {
  try {
    let totalproblem = await service.deleteProblem(req.body);
    res.json({ totalproblem }).status(200);
  } catch (error) {
    next(error);
  }
});
module.exports = routes;
