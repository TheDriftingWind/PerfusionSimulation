// The different ecg configurations


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

module.exports = {
	ecgNormal,
	ecgFast,
	ecgSlow,
	ecgFib,
	ecgFlat
}

