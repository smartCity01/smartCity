var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserBrief = new Schema({
    author: {
        type:String,
        required:true
    },
    authorId: {
        type: String,
        required: true
    }
});
