// variables
var express = require('express');
var morgan = require('morgan');
var sessionRouter = require('./routes/session');
var administrationRouter = require('./routes/administration');
var arduino = require('./routes/arduino');
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var cors = require('cors');
var uri = 'mongodb://troy:perfusion@ds113606.mlab.com:13606/perfusion-simulation';
//var User = require('./models/User');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var chatSocket = require('./sockets/sessionSocket');
var request = require('request');


var app = express();

app.use(cors())
	.use(morgan('dev'))
	.use(express.static('public'))
	.use(cookieParser()) // read cookies (needed for auth)
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.use('/sessions', sessionRouter)
	.use('/administrations', administrationRouter)
	.use('/arduino', arduino);


var server = app.listen(port, function() {
	console.log('Sever running at localhost:' + port);
	chatSocket(server);
});
