var express = require('express');
var morgan = require('morgan');
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var socket = require('./sockets/sessionSocket');
var mongoDriver = require('./config/database').driver;
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local' ).Strategy;

// use express server
var app = express();

app
	// allow cross origin
	.use(cors())
	// morgan is responsible for logging incoming requests to the console
	.use(morgan('dev'))
	// we want to serve our static files form the public folder
	.use(express.static('public'))
	// allows us to access cookies attached to requests
	.use(cookieParser())
	// body parser allows us to read the body of requests
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }));

// session and passport are used for authentication purposes
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

// connect to local mongoDB
function initDB(){
	var db = mongoose.connect(mongoDriver);
}

