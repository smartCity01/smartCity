var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');
var Event = require(libs + 'model/event');
var User = require(libs + 'model/user');
var cloudinary = require('cloudinary');

var saveEvent = (event, res) => {
    event.save(function(err) {
        if (!err) {
            log.info("New event created with id: %s", event.id);
            return res.json({
                status: 'OK',
                event: event
            });
        } else {
            if (err.name === 'ValidationError') {
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
}


router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
    } else {
        //move on
        next();
    }
});


router.get('/user-events/:id', passport.authenticate('bearer', { session: false }), function(req, res) {

    Event.find({ host: req.params.id }, function(err, events) {
        if (!err) {
            return res.json(events);
        } else {
            res.statusCode = 500;

            log.error('Internal error(%d): %s', res.statusCode, err.message);

            return res.json({
                error: 'Server error'
            });
        }
    });
});


router.get('/timeline', passport.authenticate('bearer', { session: false }), function(req, res) {

    Event.find({}, function(err, events) {
        if (!err) {
            return res.json(events);
        } else {
            res.statusCode = 500;

            log.error('Internal error(%d): %s', res.statusCode, err.message);

            return res.json({
                error: 'Server error'
            });
        }
    });
});


router.post('/', passport.authenticate('bearer', { session: false }), function(req, res) {

    User.findById(req.user.id, (err, user) => {
        cloudinary.config({
            cloud_name: 'tunup',
            api_key: '535145653862683',
            api_secret: 'y0za1rZFXkKMdTBpYJlfCsB1WEU'
        });

        if (req.body.imageBinary) {
            cloudinary.uploader.upload(req.body.imageBinary, (result) => {
                var event = new Event({
                    title: req.body.title,
                    hostName: user.username,
                    host: req.user.id,
                    description: req.body.description,
                    location: req.body.location,
                    venue: req.body.venue,
                    imageUrl: result.secure_url
                });
                saveEvent(event, res);
            });
        } else {
            var event = new Event({
                title: req.body.title,
                hostName: user.username,
                host: req.user.id,
                description: req.body.description,
                location: req.body.location,
                venue: req.body.venue
            });
            saveEvent(event, res);
        }

    });
});


router.get('/:id', passport.authenticate('bearer', { session: false }), function(req, res) {

    Event.findById(req.params.id, function(err, event) {

        if (!event) {
            res.statusCode = 404;

            return res.json({
                error: 'Not found'
            });
        }

        if (!err) {
            return res.json({
                status: 'OK',
                event: event
            });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);

            return res.json({
                error: 'Server error'
            });
        }
    });
});

router.delete('/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
    var id = req.params.id;
    Event.findById(id).remove(function(err, obj) {
        if (!err) {
            return res.json({
                status: 'OK',
                response: obj
            });
        }
        console.log(err);
        return res.status(500).send();
    });

});

router.put('/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
    var eventId = req.params.id;

    Article.findById(eventId, function(err, event) {
        if (!event) {
            res.statusCode = 404;
            log.error('Article with id: %s Not Found', eventId);
            return res.json({
                error: 'Not found'
            });
        }

        event.title = req.body.title;
        event.description = req.body.description;
        event.host = req.user.id;
        event.description = req.body.images;
        event.venue = req.body.venue;

        event.save(function(err) {
            if (!err) {
                log.info("Event with id: %s updated", article.id);
                return res.json({
                    status: 'OK',
                    article: article
                });
            } else {
                if (err.name === 'ValidationError') {
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