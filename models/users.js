const mongoose = require('mongoose');
const usersSchema = mongoose.Schema({
    Username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    sex: {
        type: String,
        require: true
    },
    height: {
        type: Number,
        require: true
    }
})
usersSchema.set('collection', 'users');
module.exports = mongoose.model('users', usersSchema);