// variables
var express = require('express');
var morgan = require('morgan');
var sessionRouter = require('./routes/session');
var administrationRouter = require('./routes/administration');
var port = process.env.PORT || 8080;

// set up express routers, host server on port 8080
express()
	.use(morgan('dev'))
	.use(express.static('public'))
	.use('/sessions', sessionRouter)
	.use('/administrations', administrationRouter)
	.listen(port, () => console.log('Sever running at localhost:' + port));