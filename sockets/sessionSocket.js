// require the node modules leveraged
var socket = require('socket.io');
var request = require('request');

// require the models being used
var SessionSchema = require('../models/Session');
var ecgModel = require('../models/Ecg');
var vitalsModel = require('../models/Vitals');

// initialize the session vitals to start values
var vitals = vitalsModel;
var ecg = ecgModel.ecgNormal;
var dataPoints = {abp:[],cap:[],cvp:[],svo2:[]};
var sessionData = [];
let administrations = [];
var users = {};
var sessionInProgress = false;
var ecgIndex = 1;
var ecgPoints = genEcg();

// function to export
module.exports = function(server){
	var io = socket(server);

	// when a new client makes a connection, set up the event handlers
	io.on('connection', function(socket){
		// update vitals with values sent from client
		socket.on('vitals', function(data){
			vitals = data;
		});

		// 1. when instructor starts new session, reset all previous session data
		// 2. inform all clients in waiting room that a session has been start 
		socket.on('startSession', function(data){
			resetSession();
			io.sockets.to('waiting-room').emit('startSession', {});
		});
		
		// if client disconnects from session, leave the room so 
		// they are not flooded with requests they cannot process
		socket.on('leaveSimulation', function(data){
			socket.leave(data.room);
		});

		// if client joins session session, join the session room 
		// they are not flooded with requests they cannot process
		socket.on('joinSimulation', function(data){
			socket.join(data.room);
			socket.emit('joinSimulation', {});
		});

		// when client leaves data portal page, remove them from the room
		socket.on('leaveDataPortal', function(data){
			socket.leave('data-portal');
		});

		// when client joins data-portal, add them to the room and
		// send them all the session data
		socket.on('joinDataPortal', function(data){
			socket.join('data-portal');
			socket.emit('data-portal', {
				administrations,
				dataPoints
			});
		});

		// if a valid client joins the waiting room, add them to the room
		// and send all waiting room users an updated users list
		socket.on('joinWaitingRoom', function(data){
			if(data.email){
				socket.join('waiting-room');
				users[data.email] = data;
				io.sockets.to('waiting-room').emit('waiting-room', users);
			}
		});

		// if a client leaves the waiting room, remove them to the room
		// and send all waiting room users an updated users list
		socket.on('leaveWaitingRoom', function(data){
			if(data.email){
				socket.leave('waiting-room');
				users[data.email] = undefined;
				io.sockets.to('waiting-room').emit('waiting-room', users);
			}
		});

		// when an ecg change request is sent, update the ecg accordingly
		socket.on('ecg', function(data){
			switch(data.ecg){
				case 'ecgNormal' : ecg = ecgModel.ecgNormal;
					break;
				case 'ecgSlow' : ecg = ecgModel.ecgSlow;
					break;
				case 'ecgFlat' : ecg = ecgModel.ecgFlat;
					break;
				case 'ecgFast' : ecg = ecgModel.ecgFast;
					break;
				case 'ecgFib' : ecg = ecgModel.ecgFib;
					break;
			}
			vitals.ecgName = ecg.name;
		});

		// when a student makes an administration, send the updated administrations
		// to all student and instructor clients
		socket.on('administration', function(data){
			for(let i = 0; i < data.length; i++){
				let time = ('00' + data[i].time.h).slice(-2) + ':' + ('00' + data[i].time.m).slice(-2) + ':' + 
					('00' + data[i].time.s).slice(-2);
				data[i].time = time;
				administrations.push(data[i]);
			}
			io.sockets.to('instr-simulation').to('stu-simulation').emit('administration', administrations);
		});

		// 1. when the instructor ends a session, message all clients that the session has ended.
		// 2. make a database call to store all session data
		socket.on('end', function(data){
			io.sockets.to('instr-simulation').to('stu-simulation').emit('end', {});
			sessionInProgress = false;
			var session = new SessionSchema({ sessionData, administrations, end_time: new Date().getTime()});
			session.save(function (err) {
			  if (err) console.log(err);
			})
		});

		// if a student administration changes abp, update it accordinly
		socket.on('abp', function(data){
			vitals.abp = vitals.abp * 1 + data.abp * 1;
		});

		// send the client all current data points
		socket.on('initCharts', function(data){
			io.sockets.emit('initCharts', dataPoints);
		});
		
		// send the client all current ecg points
		socket.on('initEcg', function(data){
			io.sockets.emit('initEcg', ecgPoints);
		});
		// TO-DO if needed
		socket.on('disconnect', function(data){});
	});
 
 	// this interval will run every 2 seconds and send the client updated vitals
	setInterval(function(){
		// if there is a session going on, send updated values. otherwise 
		// emit 'end' incase clients are stuck in one of the stations
		if(sessionInProgress){
			// we must use JSON.parse(JSON.stringify(vitals)) as a deep clone to 
			// avoid Object reference issues.
			let unadjustedVitals = JSON.parse(JSON.stringify(vitals));
			let date = new Date();
			unadjustedVitals.time = ('00' + date.getHours()).slice(-2) + ':' + ('00' + date.getMinutes()).slice(-2) + ':' + 
					('00' + date.getSeconds()).slice(-2);
			sessionData.push(unadjustedVitals);
			unadjustedVitals = JSON.parse(JSON.stringify(unadjustedVitals));
			unadjustedVitals.time = date.getTime();
			let adjustedVitals = JSON.parse(JSON.stringify(unadjustedVitals));
			
			// graph data points are calculated to be +/- (1/4) of vital increment values
			let abpPoint = Math.random() * ((adjustedVitals.abp * 1.0 + 2.5) - (adjustedVitals.abp * 1.0 - 2.5)) + (adjustedVitals.abp * 1.0 - 2.5);
			let svo2Point = Math.random() * ((adjustedVitals.svo2 * 1.0 + 1.25) - (adjustedVitals.svo2 * 1.0 - 1.25)) + (adjustedVitals.svo2 * 1.0 - 1.25);
			let capPoint = Math.random() * ((adjustedVitals.cap * 1.0 + 1.25) - (adjustedVitals.cap * 1.0 - 1.25)) + (adjustedVitals.cap * 1.0 - 1.25);
			let cvpPoint = Math.random() * ((adjustedVitals.cvp * 1.0 + 0.25) - (adjustedVitals.cvp * 1.0 - 0.25)) + (adjustedVitals.cvp * 1.0 - 0.25);
			let bisPoint = Math.random() * ((adjustedVitals.bis * 1.0 + 0.75) - (adjustedVitals.bis * 1.0 - 0.75)) + (adjustedVitals.bis * 1.0 - 0.75);
			let esoPoint = Math.random() * ((adjustedVitals.eso * 1.0 + 0.25) - (adjustedVitals.eso * 1.0 - 0.25)) + (adjustedVitals.eso * 1.0 - 0.25);
			let bldPoint = Math.random() * ((adjustedVitals.bld * 1.0 + 0.25) - (adjustedVitals.bld * 1.0 - 0.25)) + (adjustedVitals.bld * 1.0 - 0.25);

			// chop off everything up to the last 2 decimal places
			abpPoint = Math.round(abpPoint * 100) / 100;
			svo2Point = Math.round(svo2Point * 100) / 100;
			capPoint = Math.round(capPoint * 100) / 100;
			cvpPoint = Math.round(cvpPoint * 100) / 100;
			bisPoint = Math.round(bisPoint * 100) / 100;
			esoPoint = Math.round(esoPoint * 100) / 100;
			bldPoint = Math.round(bldPoint * 100) / 100;

			// make sure our adjusted value didnt not go over/under the max/min value
			adjustedVitals.abp = abpPoint > 200.0 ?  200.0 : abpPoint < 0.0 ? 0.0 : abpPoint;
			adjustedVitals.svo2 = svo2Point > 100.0 ?  100.0 : svo2Point < 25.0 ? 25.0 : svo2Point;
			adjustedVitals.cap = capPoint > 60.0 ?  60.0 : capPoint < 0.0 ? 0.0 : capPoint;
			adjustedVitals.cvp = cvpPoint > 20.0 ?  20.0 : cvpPoint < 0.0 ? 0.0 : cvpPoint;
			adjustedVitals.bis = bisPoint > 65.0 ?  65.0 : bisPoint < 15.0 ? 15.0 : bisPoint;
			adjustedVitals.eso = esoPoint > 38.0 ?  38.0 : esoPoint < 18.0 ? 18.0 : esoPoint;
			adjustedVitals.bld = bldPoint > 38.0 ?  38.0 : bldPoint < 18.0 ? 18.0 : bldPoint;		

			// push the calculated value data points
			dataPoints.abp.push([adjustedVitals.time, adjustedVitals.abp]);
			dataPoints.cap.push([adjustedVitals.time, adjustedVitals.cap]);
			dataPoints.cvp.push([adjustedVitals.time, adjustedVitals.cvp]);
			dataPoints.svo2.push([adjustedVitals.time, adjustedVitals.svo2]);

			// send the adjusted and unadjusted vitals
			io.sockets.to('instr-simulation').to('stu-simulation').emit('vitals', {adjustedVitals, unadjustedVitals});
		}else{
			io.sockets.to('instr-simulation').to('stu-simulation').emit('end', {});
		}
	}, 2000);

 	// this interval will run every .1 seconds and send the client updated ecg values
	setInterval(function(){
		if(sessionInProgress){
			// deep clone to avoid reference issues
			let data = JSON.parse(JSON.stringify(ecg));
			let height = (ecgIndex % data.interval) == 0 ? 8 : Math.random() * (data.max - data.min) + data.min;
			io.sockets.to('instr-simulation').to('stu-simulation').emit('ecg', {
				name: data.name,
				height,
				seconds: data.seconds
			});

			// honestly dont try to understand this... just accept the fact that it works ;)
			ecgPoints.push(height);
			ecgIndex ++;
			if(ecgIndex == 41){
				ecgIndex = 1;
			}
		}
	}, 100);
}

///////////////////////// helper functions ////////////////////

// generate the first 100 points of ecg 
function genEcg(){
	var data = [];
    for (i = 1; i <= 100; i++) {
       var y;

       if(i % 20 == 0){
          y = 8;
       }else{
          y = Math.random() * (3 - 1) + 1
       }

        data.push([y]);
    }
    return data;
}

// reset all session variables
function resetSession(){
	ecgIndex = 1;
	sessionData = [];
	administrations = [];
	ecgPoints = genEcg();

	vitals = vitalsModel;
	ecg = ecgModel.ecgNormal;

	dataPoints = {
		abp: [],
		cap: [],
		cvp: [],
		svo2: []
	};
	sessionInProgress = true;
}
