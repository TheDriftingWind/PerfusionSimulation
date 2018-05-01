var SessionSchema = require('../models/Session');

module.exports = function(app, passport){
    app.get('/', function(req, res){
        SessionSchema.find().sort({end_time: -1}).limit(1).exec(function(err, results) {
            if(err) console.log(err)
            console.log(results);
            res.json({});
        });
    });
}


