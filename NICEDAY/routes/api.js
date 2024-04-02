var express = require('express');
var router = express.Router();
var todayModel = require('../models/todayModel.js');
var goalModel = require('../models/goalModel.js');
const e = require('connect-flash');
var users = require('../models/users.js');

// 儲存 今日紀錄 到資料庫
router.post("/submitData", (req, res) => {
    console.log("Today Record 收到資料");
    let Tweight = req.body.TodayWeight;
    let Height = req.user.height;
    let Height2 = Height / 100;
    let TBmi = Tweight / (Height2 * Height2);
    let newData = new todayModel({
        InputDate: req.body.InputDate,
        UserID: req.user._id,
        UserName: req.user.Username,
        UserHeight: req.user.height,
        TodayWeight: req.body.TodayWeight,
        ExerciseTime: req.body.ExerciseTime,
        BMI: TBmi
    });
    newData.save((err, data) => {
        if (err) {
            res.json({
                "InputDate": data.InputDate,
                "UserID": data.UserID,
                "UserName": data.UserName,
                "UserHeight": data.UserHeight,
                "TodayWeight": 0,
                "ExerciseTime": 0,
                "BMI": 0,
            });
        } else {
            res.json({
                "InputDate": data.InputDate,
                "UserID": data.UserID,
                "UserName": data.UserName,
                "UserHeight": data.UserHeight,
                "TodayWeight": data.TodayWeight,
                "ExerciseTime": data.ExerciseTime,
                "BMI": data.BMI
            });
            console.log("Today Record 新增成功");
        }
    });
});

// 儲存 BMI 目標到資料庫
router.post("/BMIsubmit", (req, res) => {
    console.log("BMI post 收到資料");
    var newGoal = new goalModel({
        UserID: req.user._id,
        UserName: req.user.Username,
        BmiGoal: req.body.BmiGoal,
        BmiExpectDate: req.body.BmiExpectDate
    });
    
    // 下面原本未註解
    //使用下面的新增進資料庫，原本的會一直新增，下面這樣會直接更新。並且在沒有資料時新增
    const update = { BmiGoal: req.body.BmiGoal, BmiExpectDate: req.body.BmiExpectDate, UserName: req.user.Username }
    const filter = { UserID: req.user._id }
    console.log(update);
    console.log(filter);

    goalModel.find(filter, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data)
        }

    })
    goalModel.findOneAndUpdate(filter, update, { upsert: true, new: true }, function(err, docs) {
        if (err) { console.log("Error" + err); } else {
            console.log(docs);
            res.json(docs)
        };
    });
});

// 從資料庫抓資料
router.get("/getUserData", (req, res) => {
    todayModel.find({ UserID: req.user._id }, function(err, data) {
        if (err) {
            console.log("Wrong user id or date, error message: " + err);
        } else {
            // console.log(data);
            res.json(data);
            console.log("擷取使用者資料(memberData)成功");
        }
    });
});

// 抓使用者 BMI Goal
router.get("/getUserGoal", (req, res) => {
    goalModel.find({ UserID: req.user._id }, function(err, data) {
        if (err) {
            console.log("Wrong user id or date, error message: " + err);
        } else {
            console.log(data);
            res.json(data);
            console.log("擷取使用者 BMI Goal 成功");
        }
    });
});
router.get("/getData",(req, res) => {
    goalModel.find({ UserID: req.user._id }, function(err, data) {
        if (err) {
            console.log("Wrong user id or date, error message: " + err);
        } else {
            console.log(data);
            res.json(data);
            console.log("擷取使用者 BMI Goal 成功");
        }
    });
    todayModel.find({ UserID: req.user._id }, function(err, dataa) {
        if (err) {
            console.log("Wrong user id or date, error message: " + err);
        } else {
            res.json(dataa);
            console.log("擷取使用者 BMI Goal 成功");
        }
    });
});
router.post("/editmember", (req, res) => {
    console.log("edit post 收到資料");
    const update = { age: req.body.age, height: req.body.height }
    const filter = { _id: req.user._id }
    console.log(update);
    console.log(filter);

    users.find(filter, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data)
        }
    })
    users.findOneAndUpdate(filter, update, function(err, docs) {
        if (err) { console.log("Error" + err); } else {
            console.log(docs);
            res.json(docs)
        };
    })
});;
module.exports = router;