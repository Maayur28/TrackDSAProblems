const dbModel = require("../utilities/connection");
let userModel = {};
const moment = require("moment");

const sorting = (count) => {
  if (count && count.problems.length > 0) {
    const sorted = count.problems.sort(
      (a, b) => new Date(b.time) - new Date(a.time)
    );
    return sorted;
  } else return [];
};
userModel.getProblems = async (userid) => {
  let model = await dbModel.getProductConnection();
  return sorting(await model.findOne({ userid: userid }));
};
userModel.addtoProblem = async (prod) => {
  let model = await dbModel.getProductConnection();
  let getprob = await model.findOne({ userid: prod.userid });
  // prod.id = randomUUID();
  if (!getprob) {
    let obj = {};
    obj.userid = prod.userid;
    delete prod.userid;
    obj.problems = [];
    let addproblem = await model.create(obj);
    if (addproblem) {
      {
        let addprod = await model.updateOne(
          { userid: obj.userid },
          { $push: { problems: { $each: prod.problems } } }
        );
        if (addprod.nModified > 0)
          return sorting(await model.findOne({ userid: obj.userid }));
        else {
          let err = new Error();
          err.status = 500;
          err.message =
            "Sorry! Server is busy,Please try adding after sometime";
          throw err;
        }
      }
    } else {
      let err = new Error();
      err.status = 500;
      err.message = "Sorry! Server is busy,Please try adding after sometime";
      throw err;
    }
  } else {
    let id = prod.userid;
    delete prod.userid;
    let findProb = await model.find({ userid: id, "problems._id": prod._id });
    if (findProb.length == 0) {
      let pushitem = await model.updateOne(
        { userid: id },
        { $push: { problems: { $each: prod.problems } } }
      );
      if (pushitem.nModified > 0) {
        return sorting(await model.findOne({ userid: id }));
      } else {
        let err = new Error();
        err.status = 500;
        err.message = "Sorry! Server is busy,Please try adding after sometime";
        throw err;
      }
    } else {
      let err = new Error();
      err.status = 403;
      err.message = "Already present in problems";
      throw err;
    }
  }
};
userModel.getfromOrder = async () => {
  let model = await dbModel.getProductConnection();
  let count = await model.findOne({}, { trackingItem: 1, _id: 0 });
  if (!count) {
    let obj = {};
    obj.userid = userid;
    obj.trackingItem = [];
    let addorder = await model.create(obj);
    return [];
  } else {
    if (count.trackingItem.length > 0) {
      return sorting(count);
    } else return [];
  }
};

userModel.editProblem = async (prod) => {
  let model = await dbModel.getProductConnection();
  let updateQuan = await model.updateOne(
    { userid: prod.userid, "problems._id": prod._id },
    {
      $set: {
        "problems.$.difficulty": prod.difficulty,
        "problems.$.note": prod.note,
        "problems.$.title": prod.title,
        "problems.$.topic": prod.topic,
        "problems.$.url": prod.url,
        "problems.$.status": prod.status,
      },
    }
  );
  if (updateQuan.nModified == 0) {
    let err = new Error();
    err.status = 500;
    err.message = "Sorry!Server is busy.Please try to update quantity later";
    throw err;
  } else {
    return sorting(await model.findOne({ userid: prod.userid }));
  }
};

userModel.deleteProblem = async (obj) => {
  let model = await dbModel.getProductConnection();
  let getTrack = await model.updateOne(
    { userid: obj.userid },
    { $pull: { problems: { _id: obj._id } } }
  );
  if (getTrack.nModified > 0) {
    return sorting(await model.findOne({ userid: obj.userid }));
  } else {
    let err = new Error();
    err.status = 501;
    err.message = "Sorry!Server is busy.Please try to remove later";
    throw err;
  }
};

userModel.getLoveBabbarSheet = async () => {
  // await dbModel.addSheet();
  let model = await dbModel.getloveBabbarSheetConnection();
  return await model.find();
};
userModel.getStriverSheet = async () => {
  // await dbModel.addSheet();
  let model = await dbModel.getStriverSheetConnection();
  return await model.find();
};
userModel.getFrazSheet = async () => {
  // await dbModel.addSheet();
  let model = await dbModel.getFrazSheetConnection();
  return await model.find();
};
const getTime = () => {
  let m = moment().utcOffset(0);
  m.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  m.toISOString();
  m.format();
  return m.toISOString();
};
const createProblem = (problems) => {
  let arr = [],
    easy = 0,
    medium = 0,
    hard = 0;
  for (let i = 0; i < problems.length; i++) {
    if (problems[i].difficulty == "1" && easy == 0) {
      arr.push(problems[i]);
      easy = 1;
    }
    if (problems[i].difficulty == "2" && medium == 0) {
      arr.push(problems[i]);
      medium = 1;
    }
    if (problems[i].difficulty == "3" && hard == 0) {
      arr.push(problems[i]);
      hard = 1;
    }
    if (easy && medium && hard) break;
  }
  return arr;
};
const sortDiff = (arr) => {
  if (arr.length > 0) {
    const sorted = arr.sort(
      (a, b) => Number(a.difficulty) - Number(b.difficulty)
    );
    return sorted;
  } else return [];
};
userModel.getProbOfTheDay = async () => {
  // await dbModel.addSheet();
  // console.log(getTime());
  let model = await dbModel.getProblemsOfTheDayConnection();
  let total = await model.find({}, { _id: 0, __v: 0 });
  let recordTime = moment(total[0].time);
  let currentTime = moment();
  if (currentTime.diff(recordTime, "hours") >= 24) {
    let arr = createProblem(total[0].problems);
    let today = getTime();
    let add = await model.updateOne({
      $set: {
        time: today,
        current: arr,
      },
    });
    if (add.nModified) {
      let add1 = await model.updateOne({
        $pull: {
          problems: { $in: arr },
        },
      });
      if (add1.nModified) {
        let add2 = await model.updateOne({
          $push: {
            problems: { $each: total[0].current },
          },
        });
        if (add2) {
          return sortDiff(arr);
        }
      } else {
        let err = new Error();
        err.status = 501;
        err.message = "Sorry!Server is busy.Please try again later";
        throw err;
      }
    } else {
      let err = new Error();
      err.status = 501;
      err.message = "Sorry!Server is busy.Please try again later";
      throw err;
    }
  } else {
    return sortDiff(total[0].current);
  }
};
module.exports = userModel;
