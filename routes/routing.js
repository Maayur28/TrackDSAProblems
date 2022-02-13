const express = require("express");
const routes = express.Router();
const service = require("../services/user");
const LRU = require("lru-cache");
const moment = require("moment");
require("dotenv").config();
const options = {
  maxAge: 604800000,
};

const cache = new LRU(options);

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
    let totalProblem = cache.get("lovebabbar");
    if (totalProblem == undefined) {
      totalProblem = await service.getLoveBabbarSheet();
      cache.set("lovebabbar", totalProblem);
    }
    res.json({ totalProblem }).status(200);
  } catch (error) {
    next(error);
  }
});
routes.get("/striver", async (req, res, next) => {
  try {
    let totalProblem = cache.get("striver");
    if (totalProblem == undefined) {
      totalProblem = await service.getStriverSheet();
      cache.set("striver", totalProblem);
    }
    res.json({ totalProblem }).status(200);
  } catch (error) {
    next(error);
  }
});
routes.get("/fraz", async (req, res, next) => {
  try {
    let totalProblem = cache.get("fraz");
    if (totalProblem == undefined) {
      totalProblem = await service.getFrazSheet();
      cache.set("fraz", totalProblem);
    }
    res.json({ totalProblem }).status(200);
  } catch (error) {
    next(error);
  }
});
routes.get("/problemoftheday", async (req, res, next) => {
  try {
    totalproblem = await service.getProbOfTheDay();
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
