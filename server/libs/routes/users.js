var express = require('express');
var passport = require('passport');
var router = express.Router();
var libs = process.cwd() + '/libs/';
var User = require(libs + 'model/user');
var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');

router.get('/info', passport.authenticate('bearer', { session: false }),
    function(req, res) {
        // req.authInfo is set using the `info` argument supplied by
        // `BearerStrategy`.  It is typically used to indicate scope of the token,
        // and used in access control checks.  For illustrative purposes, this
        // example simply returns the scope in the response.
        res.json({ 
        	user_id: req.user.userId, 
        	name: req.user.username, 
        	scope: req.authInfo.scope 
        });
    }
);

router.post('/', passport.authenticate('bearer', { session: false }),
function(req,res){

    var user = new User({ 
        username: req.body.username,
        email: req.body.email, 
        password: req.body.password, 
    });

    user.save(function(err, user) {
        if(!err) {
            log.info("New user - %s:%s", user.username, user.password);
        }else {
            log.info(err.code);
            if(err.code === 11000) {
				res.statusCode = 405;
				res.json({ 
					error: ' Username Already Exists' 
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

module.exports = router;