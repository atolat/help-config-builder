module.exports = function (app) {

    var _ = require('underscore');
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    var formidable = require('formidable');
    //app.use(formidable.parse());
    util = require('util');

    //Twilio Integration
    var client = require('twilio')('ACd54cb6f1b8a8bf9d23fe511d24d3459e', '472205f35904bda6943ed88a1343e2b1');
    var twilio = require('twilio');

    //API ROOT
    app.get('/', function (req, res) {
        res.sendfile('./ppmform.html');
    });

app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post("/formdata", function (req, res) {
    
    console.log(req.body.user.name);
    console.log(req.body.user.email);
    console.log(req.body.user.phone);
    console.log(req.body.user.company);
    console.log(req.body.user.title);
    console.log(req.body.user.department);
    console.log(req.body.user.version);
    
    var name = req.body.user.name;
    var email = req.body.user.email;
    var phnum = req.body.user.phone;
    var company = req.body.user.company;
    var title = req.body.user.title;
    var department = req.body.user.department;
    var version = req.body.user.version;
    
    
    
    client.sendMessage({

                to: '+13058733188', // Any number Twilio can deliver to
                from: '+19492200716', // A number you bought from Twilio and can use for outbound communication
                body: 'Rishi::\nName: '+name+'\nEmail: '+email+'\nPhone Number: '+phnum+ '\nCompany: '+company+'\nTitle: '+title+'\nDepartment: '+department+'\nClarity Version: '+version// body of the SMS message

            }, function (err, responseData) { //this function is executed when a response is received from Twilio

                if (!err) { // "err" is an error received during the request, if any

                    console.log(responseData.from); 
                    console.log(responseData.body); 

                }
            });
    
     client.sendMessage({

                to: '+14088295880', // Any number Twilio can deliver to
                from: '+19492200716', // A number you bought from Twilio and can use for outbound communication
                body: 'Krishna::\nName: '+name+'\nEmail: '+email+'\nPhone Number: '+phnum+ '\nCompany: '+company+'\nTitle: '+title+'\nDepartment: '+department+'\nClarity Version: '+version// body of the SMS message

            }, function (err, responseData) { //this function is executed when a response is received from Twilio

                if (!err) { // "err" is an error received during the request, if any

                    console.log(responseData.from); 
                    console.log(responseData.body); 

                }
            });
    
     client.sendMessage({

                to: '+18184451854', // Any number Twilio can deliver to
                from: '+19492200716', // A number you bought from Twilio and can use for outbound communication
                body: 'Prakash::\nName: '+name+'\nEmail: '+email+'\nPhone Number: '+phnum+ '\nCompany: '+company+'\nTitle: '+title+'\nDepartment: '+department+'\nClarity Version: '+version// body of the SMS message

            }, function (err, responseData) { //this function is executed when a response is received from Twilio

                if (!err) { // "err" is an error received during the request, if any

                    console.log(responseData.from); 
                    console.log(responseData.body); 

                }
            });
    
    
     client.sendMessage({

                to: '+16127355183', // Any number Twilio can deliver to
                from: '+19492200716', // A number you bought from Twilio and can use for outbound communication
                body: 'Gauri::\nName: '+name+'\nEmail: '+email+'\nPhone Number: '+phnum+ '\nCompany: '+company+'\nTitle: '+title+'\nDepartment: '+department+'\nClarity Version: '+version// body of the SMS message

            }, function (err, responseData) { //this function is executed when a response is received from Twilio

                if (!err) { // "err" is an error received during the request, if any

                    console.log(responseData.from); 
                    console.log(responseData.body); 

                }
            });
    
    client.sendMessage({

                to: '+14695769843', // Any number Twilio can deliver to
                from: '+19492200716', // A number you bought from Twilio and can use for outbound communication
                body: 'Brian::\nName: '+name+'\nEmail: '+email+'\nPhone Number: '+phnum+ '\nCompany: '+company+'\nTitle: '+title+'\nDepartment: '+department+'\nClarity Version: '+version// body of the SMS message

            }, function (err, responseData) { //this function is executed when a response is received from Twilio

                if (!err) { // "err" is an error received during the request, if any

                    console.log(responseData.from); 
                    console.log(responseData.body); 

                }
            });
    res.sendfile('./thanks.html');
  
});

    
}