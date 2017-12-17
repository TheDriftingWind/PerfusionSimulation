var express = require('express');
var router = express.Router();
var https = require('https');
var request = require('request');
const baseUrl = 'https://api.mlab.com/api/1/';
const dbName = 'perfusion-simulation';
const key = '3uytyPKXCcUK5QN5wWVr0d78DAw1uPvs';
const temp = 'https://api.mlab.com/api/1/databases/perfusion-simulation/collections/Administration?apiKey=3uytyPKXCcUK5QN5wWVr0d78DAw1uPvs';

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
});

module.exports = router;