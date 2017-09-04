var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
//var User = mongoose.model('user');
var User = require('./../models/user.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign-up',function(req,res){

	console.log(req.body.name);
	var user = new User({
		password : req.body.password,
	   email : req.body.email});

	  try {

        	user.save();

        res.json( {"result" : "success"} );

    } catch( err ) {

        console.log( err );
	res.json({"result" : "fail"});
    }
});

module.exports = router;
