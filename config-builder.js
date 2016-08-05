//INITIAL CONFIGS...
var PORT =process.env.PORT || 3000;
var express = require('express');
var knox = require('knox');
var app = express();
var request = require('request');
//var routes = require('./routes/scratchpad-server')(app);

 var _ = require('underscore');
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    var knox = require('knox');
    var _ = require('underscore'); 

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


    //var globals = require('globals');

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    //API ROOT
    app.get('/', function (req, res) {
        res.sendfile('./login.html');
    });

    app.post("/getbucketname", function (req, res) {
        
        var bucketname = req.body.bucket.name;
        console.log(bucketname);

         //Create the S3 client
    var client = knox.createClient({
        key: 'AKIAJTSXS6U2YVRJ3IAQ'
        , secret: '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'
        , bucket: bucketname
    });

    
    client.get('/test/obj.json').on('response', function getNums(res){
    var responseStr = '';
    console.log(res.statusCode);
    console.log(res.headers);
    res.setEncoding('utf8');
    res.on('data', function(chunk){  
    console.log(chunk);
    var configSchema = JSON.parse(chunk);
    //Count number of tooltip urls::
    var tooltip_num = _.toArray(configSchema.tooltips).length;
    //	myApp.toolnum = tooltip_num;
    console.log(tooltip_num);

    //Count number of video resource urls::
    var video_resource_num = _.toArray(configSchema.resources.video_resources).length;
    console.log(video_resource_num);

    //Count number of video resource urls::
    var pdf_resource_num = _.toArray(configSchema.resources.pdf_resources).length;
    console.log(pdf_resource_num);

    var htmlHead = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Notification-Form</title><!-- Latest compiled and minified CSS --><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous"></head><body><form class="form-horizontal" method="post" action="/updatejson"><fieldset><!-- Form Name --><legend>"Help" Dash</legend>';

    var tooltipFieldHtml = '';

    var videoFieldHtml = '<div class="form-group"><label class="col-md-4 control-label" for="flow[tooltip1_url]">Video URL</label><div class="col-md-4"><input id="flow[tooltip1_url]" name="flow[tooltip1_url]" type="text" placeholder="" class="form-control input-md"></div></div>';

    var pdfFieldHtml = '<div class="form-group"><label class="col-md-4 control-label" for="flow[tooltip1_url]">PDF URL</label><div class="col-md-4"><input id="flow[tooltip1_url]" name="flow[tooltip1_url]" type="text" placeholder="" class="form-control input-md"></div></div>';

    var htmlTail = '<div class="form-group"><label class="col-md-4 control-label" for="singlebutton"></label><div class="col-md-4"><button type = "submit" value = "submit" id="singlebutton" name="singlebutton" class="btn btn-primary">Update Flow</button></div></div></fieldset></form></body>';

    for(i=0;i<tooltip_num;i++){
        responseStr = responseStr + '<div class="form-group"><label class="col-md-4 control-label" for="flow[tooltip1_url]">Tooltip URL</label><div class="col-md-4"><input id="flow[tooltip1_url]" name="flow[tooltip1_url]" type="text" placeholder="" class="form-control input-md"></div></div>';

    }

    request({
    url: 'https://help-config-builder.herokuapp.com/buildform', //URL to hit
    qs: {from: 'blog example', time: +new Date()}, //Query string data
    method: 'POST',
    headers: {
        'Content-Type': 'MyContentType',
        'Custom-Header': 'Custom Value'
    },
    body: responseStr //Set the body as a string
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});


  });

}).end();

    res.send('something');
    

    
    
    
  
});
app.post('/buildform',function(req,res){
console.log(req);
res.send('success');
});




app.listen(PORT, function(){
    console.log('Express server started on port:: '+PORT);
});
