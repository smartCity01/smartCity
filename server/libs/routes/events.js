var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');
var Event = require(libs + 'model/event');

router.get('/', passport.authenticate('bearer', { session: false }), function(req, res) {
	
	Event.find(function (err, events) {
		if (!err) {
			return res.json(events);
		} else {
			res.statusCode = 500;
			
			log.error('Internal error(%d): %s',res.statusCode,err.message);
			
			return res.json({ 
				error: 'Server error' 
			});
		}
	});
});

router.post('/', passport.authenticate('bearer', { session: false }), function(req, res) {
	
	var event = new Event({
		title: req.body.title,
		host: req.user.id,
		description: req.body.description,
		location: req.body.location
	});

	event.save(function (err) {
		if (!err) {
			log.info("New event created with id: %s", event.id);
			return res.json({ 
				status: 'OK', 
				event:event 
			});
		} else {
			if(err.name === 'ValidationError') {
				res.statusCode = 400;
				res.json({ 
					error: 'Validation error' 
				});
			} else {
				res.statusCode = 500;
				
				log.error('Internal error(%d): %s', res.statusCode, err.message);
				
				res.json({ 
					error: 'Server error' 
				});
			}
		}
	});
});

router.get('/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
	
	Event.findById(req.params.id, function (err, event) {
		
		if(!event) {
			res.statusCode = 404;
			
			return res.json({ 
				error: 'Not found' 
			});
		}
		
		if (!err) {
			return res.json({ 
				status: 'OK', 
				event:event 
			});
		} else {
			res.statusCode = 500;
			log.error('Internal error(%d): %s',res.statusCode,err.message);
			
			return res.json({ 
				error: 'Server error' 
			});
		}
	});
});

router.put('/:id', passport.authenticate('bearer', { session: false }), function (req, res){
	var eventId = req.params.id;

	Article.findById(eventId, function (err, event) {
		if(!event) {
			res.statusCode = 404;
			log.error('Article with id: %s Not Found', eventId);
			return res.json({ 
				error: 'Not found' 
			});
		}

		event.title = req.body.title;
		event.description = req.body.description;
		event.host = req.body.author;
		event.description = req.body.images;
		
		event.save(function (err) {
			if (!err) {
				log.info("Event with id: %s updated", article.id);
				return res.json({ 
					status: 'OK', 
					article:article 
				});
			} else {
				if(err.name === 'ValidationError') {
					res.statusCode = 400;
					return res.json({ 
						error: 'Validation error' 
					});
				} else {
					res.statusCode = 500;
					
					return res.json({ 
						error: 'Server error' 
					});
				}
				log.error('Internal error (%d): %s', res.statusCode, err.message);
			}
		});
	});
});

module.exports = router;