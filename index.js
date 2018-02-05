// variables
var express = require('express');
var morgan = require('morgan');
var sessionRouter = require('./routes/session');
var administrationRouter = require('./routes/administration');
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var uri = 'mongodb://troy:perfusion@ds113606.mlab.com:13606/perfusion-simulation';
var User = require('./models/User');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');



express()
	.use(morgan('dev'))
	.use(express.static('public'))
	.use(cookieParser()) // read cookies (needed for auth)
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.use('/sessions', sessionRouter)
	.use('/administrations', administrationRouter)
	.use(session({ secret: 'iloveprogramming' })) // session secret
	.use(passport.initialize())
	.use(passport.session()) // persistent login sessions
	.use(flash()) // use connect-flash for flash messages stored in session
	.listen(port, function(){
		console.log('Sever running at localhost:' + port)
		// mongoose.connect(uri);
		// var db = mongoose.connection;
		// db.on('error', console.error.bind(console, 'connection error:'));
		// db.once('open', function callback () {
		// 	console.log('Successful connection to database');
		// });
		
		// User.find({}, function(err, res){
		// 	console.log(res)
		// });

	});

	