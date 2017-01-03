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
    location: { 
        longitude: {
            type: Number, 
            required: true 
        }, latitude: {
            type: Number, 
            required: true
        },
    },
    description: {
        type: String,
        required: true
    }
});

    module.exports = mongoose.model('Event', Event);