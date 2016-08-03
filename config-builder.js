//INITIAL CONFIGS...
var PORT =process.env.PORT || 3000;
var express = require('express');
var prompt = require('prompt');
var color = require('colors/safe');
var fs = require('fs');
var knox = require('knox');
var app = express();

//Create the S3 client
var client = knox.createClient({
    key: 'AKIAJTSXS6U2YVRJ3IAQ'
  , secret: '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'
  , bucket: 'help-config-bucket'
});

//DEFINING configuration schema
var configSchema = {
	properties: {
		img_urls: {
			properties: {
				shoutout:{
					description: color.blue('Enter the url for the shoutout image::')
				},
				tooltip1:{
					description: color.magenta('Enter the url of the first tooltip image::')
				},
				tooltip2:{
					description: color.magenta('Enter the url of the second tooltip image::')
				},
				tooltip3: {
					description: color.magenta('Enter the url of the third tooltip image::')
				}
			}
		},
		period: {
			description: color.green('Enter the period for shoutouts--Monthly/Weekly/Quarterly/Daily::')
		}
	}
}

//Start CL prompts.
prompt.start();
prompt.message = '>>';

prompt.get(configSchema,function(error,result){
	console.log(result);

    var string = JSON.stringify(result);
//     fs.writeFile("./config", string, function(err) {
//     if(err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
  
// });

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

}); 
 
app.get('/',function(req, res){
    res.send('Root');
});

app.listen(PORT, function(){
    console.log('Express server started on port:: '+PORT);
});
