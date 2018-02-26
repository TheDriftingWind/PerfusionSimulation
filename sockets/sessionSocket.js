var socket = require('socket.io');
var request = require('request');

var vitals  = {
	abp: 120,
	cap: 35,
	bis: 50,
	svo2: 75,
	bld: 37,
	eso: 37,
	cvp: 2
}

function initSocket(server){

	var io = socket(server);

	io.on('connection', function(socket){
		console.log('made socket connection', socket.id);
		socket.emit('vitals', vitals)
		socket.on('vitals', function(data){
			vitals = data;
		});

		socket.on('disconnect', function(data){
			console.log('left page');
		});
	});

	setInterval(function(){
		let data = JSON.parse(JSON.stringify(vitals));
		let abpPoint = Math.random() * ((data.abp * 1 + 5) - (data.abp * 1 - 5)) + (data.abp * 1 - 5);
		let svo2Point = Math.random() * ((data.svo2 * 1 + 2.5) - (data.svo2 * 1 - 2.5)) + (data.svo2 * 1 - 2.5);
		let capPoint = Math.random() * ((data.cap * 1 + 2.5) - (data.cap * 1 - 2.5)) + (data.cap * 1 - 2.5);
		let cvpPoint = Math.random() * ((data.cvp * 1 + 0.5) - (data.cvp * 1 - 0.5)) + (data.cvp * 1 - 0.5);
		let bisPoint = Math.random() * ((data.bis * 1 + 1.5) - (data.bis * 1 - 1.5)) + (data.bis * 1 - 1.5);
		let esoPoint = Math.random() * ((data.eso * 1 + 0.5) - (data.eso * 1 - 0.5)) + (data.eso * 1 - 0.5);
		let bldPoint = Math.random() * ((data.bld * 1 + 0.5) - (data.bld * 1 - 0.5)) + (data.bld * 1 - 0.5);

		data.abp = abpPoint > data.abp ? Math.min(Math.round(abpPoint * 100) / 100, 200) : Math.max(Math.round(abpPoint * 100) / 100, 0);
		data.svo2 = svo2Point > data.svo2 ? Math.min(Math.round(svo2Point * 100) / 100, 100) : Math.max(Math.round(svo2Point * 100) / 100, 25);
		data.cap = capPoint > data.cap ? Math.min(Math.round(capPoint * 100) / 100, 60) : Math.max(Math.round(capPoint * 100) / 100, 0);
		data.cvp = cvpPoint > data.cvp ? Math.min(Math.round(cvpPoint * 100) / 100, 20) : Math.max(Math.round(cvpPoint * 100) / 100, 0);
		data.bis = bisPoint > data.bis ? Math.min(Math.round(bisPoint * 100) / 100, 65) : Math.max(Math.round(bisPoint * 100) / 100, 15);
		data.eso = esoPoint > data.eso ? Math.min(Math.round(esoPoint * 100) / 100, 38) : Math.max(Math.round(esoPoint * 100) / 100, 18);
		data.bld = bldPoint > data.bld ? Math.min(Math.round(bldPoint * 100) / 100, 38) : Math.max(Math.round(bldPoint * 100) / 100, 18);
		console.log(data)
		io.sockets.emit('vitals', data);
	}, 1000);

	setInterval(function(){
		io.sockets.emit('ecg', {});
	}, 100);
}




module.exports = initSocket;
