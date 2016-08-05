module.exports = function (app) {

    var _ = require('underscore');
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    var knox = require('knox');

    //Create the S3 client
    var client = knox.createClient({
        key: 'AKIAJTSXS6U2YVRJ3IAQ'
        , secret: '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'
        , bucket: 'help-config-bucket'
    });

    var configSchema = {
        tooltips : {
            tooltip1_url : '',
            tooltip2_url : '',
            tooltip3_url : ''

        },  
        resources : {
            video_resource_url : '',
            pdf_resource_url : ''
        },
        shoutout:{
            shoutout_url : '',
            period : ''
        }
    };


    //API ROOT
    app.get('/', function (req, res) {
        res.sendfile('./config-form.html');
    });

    app.use(bodyParser.urlencoded({
        extended: true
    }));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post("/buildjson", function (req, res) {
    
    console.log(req.body.flow.tooltip1_url);
    console.log(req.body.flow.tooltip2_url);
    console.log(req.body.flow.tooltip3_url);
    console.log(req.body.flow.pdf_resource_url);
    console.log(req.body.flow.video_resource_url);
    console.log(req.body.flow.shoutout_url);
    console.log(req.body.flow.period);

    configSchema.tooltips.tooltip1_url = req.body.flow.tooltip1_url;
    configSchema.tooltips.tooltip2_url = req.body.flow.tooltip2_url;
    configSchema.tooltips.tooltip3_url = req.body.flow.tooltip3_url;
    configSchema.resources.pdf_resource_url = req.body.flow.pdf_resource_url;
    configSchema.resources.video_resource_url = req.body.flow.video_resource_url;
    configSchema.shoutout.shoutout_url = req.body.flow.shoutout_url;
    configSchema.shoutout.period = req.body.flow.period;

    console.log(configSchema);

    var string = JSON.stringify(configSchema);

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
    

    
    
    res.send('Cool!');
  
});

    
}