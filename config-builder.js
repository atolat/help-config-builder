//INITIAL CONFIGS...
var PORT =process.env.PORT || 3000;
var express = require('express');
var knox = require('knox');
var app = express();
var globals = require('globals');
var routes = require('./routes/scratchpad-server')(app);

//CORS Configuration
allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
};

app.use(allowCrossDomain);


app.listen(PORT, function(){
    console.log('Express server started on port:: '+PORT);
});
