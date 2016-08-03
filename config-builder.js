//INITIAL CONFIGS...
var PORT =process.env.PORT || 3000;
var express = require('express');
var knox = require('knox');
var app = express();
var routes = require('./routes/server')(app);

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




//Create the S3 client
// var client = knox.createClient({
//     key: 'AKIAJTSXS6U2YVRJ3IAQ'
//   , secret: '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'
//   , bucket: 'help-config-bucket'
// });

//DEFINING configuration schema
// var configSchema = {
// 	properties: {
// 		img_urls: {
// 			properties: {
// 				shoutout:{
// 					description: color.blue('Enter the url for the shoutout image::')
// 				},
// 				tooltip1:{
// 					description: color.magenta('Enter the url of the first tooltip image::')
// 				},
// 				tooltip2:{
// 					description: color.magenta('Enter the url of the second tooltip image::')
// 				},
// 				tooltip3: {
// 					description: color.magenta('Enter the url of the third tooltip image::')
// 				}
// 			}
// 		},
// 		period: {
// 			description: color.green('Enter the period for shoutouts--Monthly/Weekly/Quarterly/Daily::')
// 		}
// 	}
// }

//Start CL prompts.
// prompt.start();
// prompt.message = '>>';

// prompt.get(configSchema,function(error,result){
// 	console.log(result);

//     var string = JSON.stringify(result);

//  var req = client.put('/test/obj.json', {
//     'Content-Length': Buffer.byteLength(string)
//   , 'Content-Type': 'application/json'
//   , 'x-amz-acl': 'public-read'
// });
// req.on('response', function(res){
//   if (200 == res.statusCode) {
//     console.log('saved to %s', req.url);
//   }
// });
// req.end(string);

// }); 
 

app.listen(PORT, function(){
    console.log('Express server started on port:: '+PORT);
});
