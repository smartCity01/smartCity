var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Event = new Schema({
    title: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    hostName: {
        type: String,
        required: true
    },
    location: {
        longitude: {
            type: Number,
            required: false
        },
        latitude: {
            type: Number,
            required: false
        },
    },
    description: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    },
    venue: {
        type: String,
        required: false
    },
    commentCount:{
        type:Number,
        default: 0,
        required:true
    },
    comment: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
    }]

   
});

module.exports = mongoose.model('Event', Event);