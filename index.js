// variables
var express = require('express');
var morgan = require('morgan');
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var socket = require('./sockets/sessionSocket');
var request = require('request');
var mongoose = require('mongoose');
var mongoDriver = require('./config/database').driver;
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local' ).Strategy;

var app = express();

app.use(cors())
	.use(morgan('dev'))
	.use(express.static('public'))
	.use(cookieParser()) // read cookies (needed for auth)
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// start server
var server = app.listen(port, function() {
	console.log('Sever running at localhost:' + port);
	socket(server);
	initDB();
});

// routes
require('./routes/authentication')(app, passport);
require('./routes/arduino')(app);
require('./routes/session')(app);



function initDB(){
	var db = mongoose.connect(mongoDriver);
}

