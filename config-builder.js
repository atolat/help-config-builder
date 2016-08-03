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

    var str = JSON.stringify(result);
    fs.writeFile("./temp.txt", str, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
    client.putFile('./temp.txt', {'Content-Type': 'text/plain'}, function(err, result) {
    if (200 == result.statusCode) { console.log('Uploaded to mazon S3'); }
    else { console.log('Failed to upload file to Amazon S3'); }
});
});



}); 
 
app.get('/',function(req, res){
    res.send('Root');
});

app.listen(PORT, function(){
    console.log('Express server started on port:: '+PORT);
});
