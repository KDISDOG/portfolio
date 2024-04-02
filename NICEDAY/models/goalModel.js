const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    InputDate: String,
    UserID: String,
    UserName: String,
    BmiGoal: Number,
    BmiExpectDate: String
});

goalSchema.set('collection', 'userGoal');

module.exports = mongoose.model('userGoal', goalSchema);