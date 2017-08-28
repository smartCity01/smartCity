var express = require('express');
var passport = require('passport');
var router = express.Router();
var libs = process.cwd() + '/libs/';
var User = require(libs + 'model/user');
var Comment = require(libs + 'model/comment')
var log = require(libs + 'log')(module);
var Event = require(libs + 'model/event');
var db = require(libs + 'db/mongoose');

router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header("Access-Control-Allow-Credentials" ,value="true" );
    log.info(req.method);
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
    } else {
        //move on
        next();
    }
});

router.get('/:id', passport.authenticate('bearer', { session: false }),
    function(req, res) {
            Event.findOne({ _id: req.params.id })
                .populate('comment')                
                .exec(function (err, obj) {
            
            if (!err) {
               return res.json(obj);
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s', res.statusCode, err.message);

                return res.json({
                    error: 'Server error'
                });
            }
        });            
    }
);


router.post('/', passport.authenticate('bearer', { session: false }), function(req, res) {
               var comment = new Comment({
                userBrief:{author:req.body.userData.username,
                authorId:req.body.userData._id},                      
                text: req.body.text,
                });
        
         comment.save(function(err, obj) {
            if (!err) {
               Event.update({ _id:req.body.id },
             { $push: { comment: comment._id },
             $inc: { commentCount: 1 }},
             function (err, obj) {
             if (!err) {
                return res.json({
                status: 'OK',
                response: obj
            });
            } 
              console.log(err);
        return res.status(500).send();
             });
            }                 
        });    
    
});

router.put('/:id', passport.authenticate('bearer', { session: false }), function(req, res) {     
    Comment.update({ _id:req.params.id },
    { $set: { text: req.body.text }},
    function (err, obj) {
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

router.put('/count/:id', passport.authenticate('bearer', { session: false }), function(req, res) {     
    Event.update({ _id:req.params.id },
    { $inc: { commentCount: -1 }},
    function (err, obj) {
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

       
router.delete('/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
    var id = req.params.id;
    Comment.findById(id).remove(function(err, obj) {
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
    

module.exports = router;