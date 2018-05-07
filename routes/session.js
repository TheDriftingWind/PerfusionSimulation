var SessionSchema = require('../models/Session');

module.exports = function(app){
	// return the most recent session
    app.get('/session', function(req, res){
        SessionSchema.find().sort({end_time: -1}).limit(1).exec(function(err, results) {
            if(err) console.log(err)
            res.json({results});
        });
    });
}


