var express = require('express');
var router = express.Router();
var https = require('https');
var request = require('request');

router.get('/login', function(req, res){
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
.get('/logout', function(req, res){
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
.post('/login', function(req,res){
    request({
        url: temp,
        method: "POST",
        json: true,
        body: generateSession()
    }, function (error, response, body){
    res.json(response.request.body);
    });
})
.post('/register', function(req,res){
    request({
        url: temp,
        method: "PUT",
        json: true,
        body: []
    }, function (error, response, body){
        res.json(response.request.body);
    });
});
