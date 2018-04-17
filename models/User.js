var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var passport = require('passport');


var User = mongoose.model('User', mongoose.Schema({
	first_name:{
  		type: String,
  		required: true
  	},
  	last_name:{
  		type: String,
  		required: true
  	},
  	email:{
  		type: String,
  		index: true,
  		unique : true,
		required: true
  	},
  	password:{
  		type: String,
  		required: true
  	},
  	isInstructor:{
  		type: Boolean,
  		required: true
  	}
}));

function createUser(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
		if(err) console.log(err)
		bcrypt.hash(newUser.password, salt, function(err, hash) {
			if(err) console.log(err)
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}

function getUserByEmail(email, callback){
  let Obj = {email: email}
  User.findOne(Obj, callback);
}

function comparePassword(password, hash, callback){
	bcrypt.compare(password, hash, function(err, isMatch){
		if(err) throw err;
		callback(null, isMatch);
	});
}

function getUserById(id, callback){
  	User.findById(id, callback);
}

module.exports = {
	User,
	createUser,
	getUserByEmail,
	comparePassword,
	getUserById
};