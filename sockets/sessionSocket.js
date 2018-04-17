var SessionSchema = require('../models/Session');
var socket = require('socket.io');
var request = require('request');
var isSession = true;
var messages = [];
var vitalsData = [];
var users = {};
var vitals  = {
	abp: 120,
	cap: 35,
	bis: 50,
	svo2: 75,
	bld: 37,
	eso: 37,
	cvp: 2
}

var ecgNormal = {
	name: 'ecgNormal',
	interval: 20,
  	min: 1,
	max: 3,
	seconds: '80'
}

var ecgSlow = {
	name: 'ecgSlow',
	interval: 30,
  	min: 1,
	max: 3,
	seconds: '50'
}

var ecgFast = {
	name: 'ecgFast',
	interval: 10,
  	min: 1,
	max: 3,
	seconds: '110'
}

var ecgFlat = {
	name: 'ecgFlat',
	interval: 99,
  	min: 0,
	max: 1,
	seconds: '0'
}

var ecgFib = {
	name: 'ecgFib',
	interval: 5,
  	min: 5,
	max: 1,
	seconds: '140'
}

var ecg = ecgNormal;

var dataPoints = {
	abp: [],
	cap: [],
	cvp: [],
	svo2: []
};

function initSocket(server){

	var io = socket(server);

	io.on('connection', function(socket){
		if(!isSession){
			io.sockets.to('simulation').emit('end', {});
		}
		console.log('made socket connection', socket.id);
		socket.emit('initCharts', dataPoints)
		socket.emit('initMessages', messages)
		socket.emit('ecg', ecg)
		socket.on('vitals', function(data){
			vitals = data;
		});
		
		socket.on('leaveSimulation', function(data){
			socket.leave('simulation');
		})

		socket.on('joinSimulation', function(data){
			socket.join('simulation');
			socket.emit('joinSimulation', data)
		})

		socket.on('joinWaitingRoom', function(data){
			if(data.email){
				socket.join('waiting-room');
				console.log(data)
				users[data.email] = data;
				io.sockets.to('waiting-room').emit('waiting-room', users)
			}
		})

		socket.on('leaveWaitingRoom', function(data){
			if(data.email){
				socket.leave('waiting-room');
				console.log(data)
				users[data.email] = undefined;
				io.sockets.to('waiting-room').emit('waiting-room', users)
			}
		})

		socket.on('ecg', function(data){
			switch(data.ecg){
				case 'ecgNormal' : ecg = ecgNormal;
					break;
				case 'ecgSlow' : ecg = ecgSlow;
					break;
				case 'ecgFlat' : ecg = ecgFlat;
					break;
				case 'ecgFast' : ecg = ecgFast;
					break;
				case 'ecgFib' : ecg = ecgFib;
					break;
			}
		});

		socket.on('administration', function(data){
			let administrations = [];
			for(let i = 0; i < data.length; i++){
				let time = data[i].time;
				let administration = ('00' + time.h).slice(-2) + ':' + ('00' + time.m).slice(-2) + ':' + 
					('00' + time.s).slice(-2) + ' ' +  data[i].email +  ' administered ' + data[i].dosage + 
					data[i].units + ' of ' + data[i].medication + '.';
				messages.push(administration);
				administrations.push(administration);
			}
			io.sockets.to('simulation').emit('administration', administrations);
		});
		socket.on('end', function(data){
			io.sockets.to('simulation').emit('end', data);
			isSession = false;
			var session = new SessionSchema({ datapoints: vitalsData, activity: messages });
			session.save(function (err) {
			  if (err) console.log(err)
			})
		});
		socket.on('abp', function(data){
			vitals.abp += data.abp;
		});
		socket.on('initCharts', function(data){
			let start = dataPoints.length > 30 ? dataPoints.length - 30 : 0;
			io.sockets.emit('initCharts', dataPoints);
		});
		socket.on('disconnect', function(data){
			console.log('left page');
		});
	});

	setInterval(function(){
		io.sockets.to('test').emit('test',{data:'fuck'})
	}, 1000)

	setInterval(function(){
		vitalsData.push(vitals);
		let data = JSON.parse(JSON.stringify(vitals));
		let abpPoint = Math.random() * ((data.abp * 1.0 + 5.0) - (data.abp * 1.0 - 5.0)) + (data.abp * 1.0 - 5.0);
		let svo2Point = Math.random() * ((data.svo2 * 1.0 + 2.5) - (data.svo2 * 1.0 - 2.5)) + (data.svo2 * 1.0 - 2.5);
		let capPoint = Math.random() * ((data.cap * 1.0 + 2.5) - (data.cap * 1.0 - 2.5)) + (data.cap * 1.0 - 2.5);
		let cvpPoint = Math.random() * ((data.cvp * 1.0 + 0.5) - (data.cvp * 1.0 - 0.5)) + (data.cvp * 1.0 - 0.5);
		let bisPoint = Math.random() * ((data.bis * 1.0 + 1.5) - (data.bis * 1.0 - 1.5)) + (data.bis * 1.0 - 1.5);
		let esoPoint = Math.random() * ((data.eso * 1.0 + 0.5) - (data.eso * 1.0 - 0.5)) + (data.eso * 1.0 - 0.5);
		let bldPoint = Math.random() * ((data.bld * 1.0 + 0.5) - (data.bld * 1.0 - 0.5)) + (data.bld * 1.0 - 0.5);

		abpPoint = Math.round(abpPoint * 100) / 100;
		svo2Point = Math.round(svo2Point * 100) / 100;
		capPoint = Math.round(capPoint * 100) / 100;
		cvpPoint = Math.round(cvpPoint * 100) / 100;
		bisPoint = Math.round(bisPoint * 100) / 100;
		esoPoint = Math.round(esoPoint * 100) / 100;
		bldPoint = Math.round(bldPoint * 100) / 100;

		data.abp = abpPoint > 200.0 ?  200.0 : abpPoint < 0.0 ? 0.0 : abpPoint;
		data.svo2 = svo2Point > 100.0 ?  100.0 : svo2Point < 25.0 ? 25.0 : svo2Point;
		data.cap = capPoint > 60.0 ?  60.0 : capPoint < 0.0 ? 0.0 : capPoint;
		data.cvp = cvpPoint > 20.0 ?  20.0 : cvpPoint < 0.0 ? 0.0 : cvpPoint;
		data.bis = bisPoint > 65.0 ?  65.0 : bisPoint < 15.0 ? 15.0 : bisPoint;
		data.eso = esoPoint > 38.0 ?  38.0 : esoPoint < 18.0 ? 18.0 : esoPoint;
		data.bld = bldPoint > 38.0 ?  38.0 : bldPoint < 18.0 ? 18.0 : bldPoint;		
		data.time = new Date().getTime();
		dataPoints.abp.push([data.time, data.abp]);
		dataPoints.cap.push([data.time, data.cap]);
		dataPoints.cvp.push([data.time, data.cvp]);
		dataPoints.svo2.push([data.time, data.svo2]);
		io.sockets.to('simulation').emit('vitals', data);
	}, 2000);

	setInterval(function(){
		io.sockets.to('simulation').emit('ecg', ecg);
	}, 100);
}

module.exports = initSocket;

