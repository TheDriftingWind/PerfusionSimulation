var express = require('express');
var router = express.Router();
var https = require('https');
var request = require('request');
const baseUrl = 'https://api.mlab.com/api/1/';
const dbName = 'perfusion-simulation';
const key = '3uytyPKXCcUK5QN5wWVr0d78DAw1uPvs';
const collection = 'Session';
const temp = 'https://api.mlab.com/api/1/databases/perfusion-simulation/collections/Session?apiKey=3uytyPKXCcUK5QN5wWVr0d78DAw1uPvs';

router.get('/', function(req, res){
    https.get(temp, (httpRes) => {
        let data = '';
        httpRes.on('data', (chunk)=> data += chunk);
        httpRes.on('end', ()=>{

            res.json(JSON.parse(data));
        }).on('error', (err) => {
            res.json(err);
        });
    });
})
.post('/', function(req,res){
    request({
        url: temp,
        method: "POST",
        json: true,
        body: generateSession()
    }, function (error, response, body){
    res.json(response.request.body);
    });
}).put('/', function(req,res){
    request({
        url: temp,
        method: "PUT",
        json: true,
        body: []
    }, function (error, response, body){
        res.json(response.request.body);
    });
});

function generateSession(){
    let sessions = [];
        sessions.push({
            "ABP"  : generateABP(),
            "ALP"  : generateALP(),
            "SVO2" : generateSVO2(),
            "CVP"  : generateCVP(),
            "Temp" : generateTemp(),
            "BIS"  : generateBIS(),
            "LMP"  : generateLMP(),
            "FIO2" : generateFIO2()
        });
    return sessions;
}

function generateNums(){
    let items = [];
    for(let i = 0; i < 10; i++){
        items.push(getRandomInt(0,10));
    }
    return items;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function generateABP(){
    let items = [];
    for(let i = 0; i < 10; i++){
        items.push(getRandomInt(0,200));
    }
    return items;
}
function generateALP(){
        let items = [];
    for(let i = 0; i < 10; i++){
        items.push(getRandomInt(0,500));
    }
    return items;
}
function generateSVO2(){
    let items = [];
    for(let i = 0; i < 10; i++){
        items.push(getRandomInt(25,100));
    }
    return items;
}
function generateCVP(){
    let items = [];
    for(let i = 0; i < 10; i++){
        items.push(getRandomInt(0,20));
    }
    return items;
}
function generateTemp(){
    let items = [];
    for(let i = 0; i < 10; i++){
        items.push(getRandomInt(4,39));
    }
    return items;
}
function generateBIS(){
    let items = [];
    for(let i = 0; i < 10; i++){
        items.push(getRandomInt(15,65));
    }
    return items;
}
function generateLMP(){
    let items = [];
    for(let i = 0; i < 10; i++){
        items.push(getRandomInt(0,10));
    }
    return items;
}
function generateFIO2(){
    let items = [];
    for(let i = 0; i < 10; i++){
        num = Math.random() * (1.0 - .21) + .21;
        num = Math.floor(num * 100);
        num = num / 100;

        items.push(num);
    }
    return items;
}

module.exports = router;