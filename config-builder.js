//INITIAL CONFIGS...
var PORT =process.env.PORT || 3000;
var express = require('express');
var knox = require('knox');
var app = express();
var request = require('request');
var tableify = require('tableify');
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


app.use(bodyParser.urlencoded({
        extended: true
    }));

    //API ROOT
    app.get('/', function (req, res) {
        res.sendfile('./login.html');
    });


app.post('/buildform',function(req,res){
	// var dataStream = JSON.parse(req.body);
	// console.log(dataStream);
	// //console.log(dataStream.tooltips);
	var dataStream = JSON.parse(req.body.bucket.data);

	console.log(dataStream);
	
	//Count number of tooltip urls::
    var tooltip_num = _.toArray(dataStream.tooltips).length;

    //	myApp.toolnum = tooltip_num;
    console.log(tooltip_num);

    //Count number of video resource urls::
    var video_resource_num = _.toArray(dataStream.video).length;
    console.log(video_resource_num);

    //Count number of video resource urls::
    var pdf_resource_num = _.toArray(dataStream.pdf).length;
    console.log(pdf_resource_num);

    var currentConfig = tableify(dataStream);

    var htmlHead = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>URL Update Console</title><!-- Latest compiled and minified CSS --><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous"></head><body><form class="form-horizontal" method="post" action="/updatejson"><fieldset><!-- Form Name --><legend>"Help" Dash</legend>';

    var tooltipFieldHtml = '';

    var videoFieldHtml = '';

    var pdfFieldHtml = '';

    var hidden = '<div class="form-group"><div class="col-md-4"><input  id="bucket[name]" type = "hidden" name="bucket[name]" type="text" value = "'+dataStream.bucket_name+'" placeholder="" class="form-control input-md"></div></div>';

    var htmlTail = '<div class="form-group"><label class="col-md-4 control-label" for="singlebutton"></label><div class="col-md-4"><button type = "submit" value = "submit" id="singlebutton" name="singlebutton" class="btn btn-primary">Update Flow</button></div></div></fieldset></form></body>';



    for(i=1;i<=tooltip_num;i++){
        tooltipFieldHtml = tooltipFieldHtml + '<div class="form-group"><label class="col-md-4 control-label" for="tooltips[tooltip'+i+'_url]">Tooltip '+i+' URL</label><div class="col-md-4"><input id="tooltips[tooltip'+i+'_url]" name="tooltips[tooltip'+i+'_url]" type="text" placeholder="" class="form-control input-md"></div></div>';
    }

    for(i=1;i<=video_resource_num;i++){
        videoFieldHtml = videoFieldHtml + '<div class="form-group"><label class="col-md-4 control-label" for="video[video'+i+'_url]">Video '+i+' URL</label><div class="col-md-4"><input id="video[video'+i+'_url]" name="video[video'+i+'_url]" type="text" placeholder="" class="form-control input-md"></div></div>';
    }

    for(i=1;i<=pdf_resource_num;i++){
        pdfFieldHtml = pdfFieldHtml + '<div class="form-group"><label class="col-md-4 control-label" for="pdf[pdf'+i+'_url]">PDF '+i+' URL</label><div class="col-md-4"><input id="pdf[pdf'+i+'_url]" name="pdf[pdf'+i+'_url]" type="text" placeholder="" class="form-control input-md"></div></div>';
    }

	res.send(htmlHead+tooltipFieldHtml+videoFieldHtml+pdfFieldHtml+hidden+htmlTail+currentConfig);
});

app.post("/updatejson", function (req, res) {
    
  console.log(req.body.bucket.name);

  //Count number of tooltip urls::
    var tooltip_arr = _.toArray(req.body.tooltips);
    var tooltip_num = _.toArray(req.body.tooltips).length;

    var jsonSchema = req.body;
    jsonSchema.bucket_name = req.body.bucket.name;



    console.log(jsonSchema);

  //Create the S3 client
    var client = knox.createClient({
        key: 'AKIAJTSXS6U2YVRJ3IAQ'
        , secret: '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'
        , bucket: req.body.bucket.name
    });

    var string = JSON.stringify(jsonSchema);

    var req = client.put('/test/obj.json', {
        'Content-Length': Buffer.byteLength(string)
        , 'Content-Type': 'application/json'
        , 'x-amz-acl': 'public-read'
    });
    
    req.on('response', function(res){
        
        if (200 == res.statusCode) {
            console.log('saved to %s', req.url);
        }
    });
    
    req.end(string);
    

    
    
    res.send('Flow Updated');
  
});


app.listen(PORT, function(){
    console.log('Express server started on port:: '+PORT);
});
