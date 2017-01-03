var mongoose = require('mongoose');

var libs = process.cwd() + '/libs/';

var log = require(libs + 'log')(module);
var config = require(libs + 'config');

var options = {
	server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
	replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

mongoose.connect('mongodb://testuser2:test@ds032319.mlab.com:32319/joinus_profiles', options);

var db = mongoose.connection;

db.on('error', function (err) {
	log.error('Connection error:', err.message);
});

db.once('open', function callback() {
	log.info("Connected to DB!");
});

module.exports = mongoose;