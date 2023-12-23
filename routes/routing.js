const express = require("express");
const routes = express.Router();
const service = require("../services/user");
const LRU = require("lru-cache");
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

routes.get("/getnotes/:userid", async (req, res, next) => {
  try {
    let totalnote = await service.getNotes(req.params.userid);
    res.json({ totalnote }).status(200);
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
routes.post("/addnote", async (req, res, next) => {
  try {
    let totalnote = await service.addtoNote(req.body);
    res.json({ totalnote }).status(200);
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
routes.put("/editnote", async (req, res, next) => {
  try {
    let totalnote = await service.editNote(req.body);
    res.json({ totalnote }).status(200);
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
routes.delete("/deletenote", async (req, res, next) => {
  try {
    let totalnote = await service.deleteNote(req.body);
    res.json({ totalnote }).status(200);
  } catch (error) {
    next(error);
  }
});
routes.post("/sendmail", async (req, res, next) => {
  try {
    await service.sendMail(req.body);
    res.json({ status: true }).status(200);
  } catch (error) {
    next(error);
  }
});

routes.get("/", async (req, res, next) => {
  try {
    res.json("Ping Successful").status(200);
  } catch (error) {
    next(error);
  }
});

module.exports = routes;
