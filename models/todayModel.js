const mongoose = require('mongoose');

// 存進 MongoDB 的資料
const todaySchema = new mongoose.Schema({
    InputDate: String,
    UserID: String,
    UserName: String,
    UserHeight: Number,
    TodayWeight: Number,
    ExerciseTime: Number,
    BMI: Number
});

todaySchema.set('collection', 'memberData');

module.exports = mongoose.model('memberData', todaySchema);