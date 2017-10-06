var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var libs = process.cwd() + '/libs/';
var UserBrief = require(libs + 'model/userBrief');

var Comment = new Schema({
    userBrief: UserBrief,
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comment', Comment);