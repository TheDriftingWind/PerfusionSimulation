var mongoose = require('mongoose');

var Session = mongoose.model('Session', mongoose.Schema({
	datapoints:{
  		type: {
  			abp: Number,
	  		cap: Number,
	  		bis: Number,
	  		svo2: Number,
	  		bld: Number,
	  		eso: Number,
	  		cvp: Number,
	  	},
	  	required: true
  	},
  	activity:{
  		type: [String],
  		required: false
  	}
}));


module.exports = Session;