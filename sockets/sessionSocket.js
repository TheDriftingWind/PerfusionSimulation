var SessionSchema = require('../models/Session');
var socket = require('socket.io');
var request = require('request');
var isSession = true;
var ecgIndex = 1;
var messages = [];
var vitalsData = [];
let administrations = [];
var ecgPoints = genEcg();
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
		console.log('made socket connection', socket.id);
		socket.on('vitals', function(data){
			vitals = data;
		});

		socket.on('startSession', function(data){
			io.sockets.to('waiting-room').emit('startSession', {});
		})
		
		socket.on('leaveSimulation', function(data){
			socket.leave(data.room);
		})

		socket.on('joinSimulation', function(data){
			socket.join(data.room);
			socket.emit('joinSimulation', data)
		})

		socket.on('leaveDataPortal', function(data){
			socket.leave('data-portal');
		})

		socket.on('joinDataPortal', function(data){
			socket.join('data-portal');
			socket.emit('data-portal', {
				administrations,
				dataPoints
			})
		})

		socket.on('joinWaitingRoom', function(data){
			if(data.email){
				socket.join('waiting-room');
				users[data.email] = data;
				io.sockets.to('waiting-room').emit('waiting-room', users)
			}
		})

		socket.on('leaveWaitingRoom', function(data){
			if(data.email){
				socket.leave('waiting-room');
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
			for(let i = 0; i < data.length; i++){
				let time = ('00' + data[i].time.h).slice(-2) + ':' + ('00' + data[i].time.m).slice(-2) + ':' + 
					('00' + data[i].time.s).slice(-2)
				let administration = time + ' ' +  data[i].email +  ' administered ' + data[i].dosage + 
					data[i].units + ' of ' + data[i].medication + '.';
				data[i].time = time;
				messages.push(administration);
				administrations.push(data[i]);
			}
			io.sockets.to('instr-simulation').to('stu-simulation').emit('administration', messages);
		});
		socket.on('end', function(data){
			io.sockets.to('instr-simulation').to('stu-simulation').emit('end', data);
			isSession = false;
			var session = new SessionSchema({ datapoints: vitalsData, activity: messages });
			session.save(function (err) {
			  if (err) console.log(err)
			})
			setInterval(function(){
				io.sockets.to('instr-simulation').to('stu-simulation').emit('end', data);
			}, 2000)
		});
		socket.on('abp', function(data){
			vitals.abp += data.abp;
		});
		socket.on('initCharts', function(data){
			io.sockets.emit('initCharts', dataPoints);
		});
		socket.on('initEcg', function(data){
			io.sockets.emit('initEcg', ecgPoints);
		});
		socket.on('disconnect', function(data){
			console.log('left page');
		});
	});

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
		io.sockets.to('instr-simulation').to('stu-simulation').emit('vitals', data);
	}, 2000);

	setInterval(function(){
		let data = JSON.parse(JSON.stringify(ecg));
		let height = (ecgIndex % data.interval) == 0 ? 8 : Math.random() * (data.max - data.min) + data.min;
		io.sockets.to('instr-simulation').to('stu-simulation').emit('ecg', {
			height,
			seconds: data.seconds
		});
		ecgPoints.push(height)
		ecgIndex ++;
		if(ecgIndex == 41){
			ecgIndex = 1;
		}
	}, 100);
}

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
    return data
}

module.exports = initSocket;

