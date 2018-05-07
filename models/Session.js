var mongoose = require('mongoose');

var Session = mongoose.model('Session', mongoose.Schema({
	sessionData:{
  		type: {
  			abp: Number,
	  		cap: Number,
	  		bis: Number,
	  		svo2: Number,
	  		bld: Number,
	  		eso: Number,
	  		cvp: Number,
	  		ecg: String, 
	  		time: Number
	  	},
	  	required: true
  	},
  	administrations:{
  		type: {
	  		time: String,
	  		email: String,
	  		dosage: String,
	  		units: String,
	  		medication: String
  		}
  	},
  	end_time: {
  		type: Number,
  		required: true
  	}
}));

module.exports = Session;