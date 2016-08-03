var prompt = require('prompt');
var color = require('colors/safe');
var fs = require('fs');
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
prompt.start();
prompt.message = '>>';

prompt.get(configSchema,function(error,result){
	console.log(result);

    var str = JSON.stringify(result);
    fs.writeFile("./temp", str, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});



}); 
 


