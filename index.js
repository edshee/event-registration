var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')
var Cloudant = require('cloudant');

// manually add cloudant url here if not binding as a service
var cloudant_url = "https://55f26bd0-a38e-46c0-8586-266baed02037-bluemix:08efe155240fadd219ef51ae5254ec1020913bac456cf887bfebc49634e297e7@55f26bd0-a38e-46c0-8586-266baed02037-bluemix.cloudant.com";

// get cloudant env variables
if (process.env.VCAP_SERVICES) {
    var services = JSON.parse(process.env.VCAP_SERVICES);
    // check if cloudant is bound to app
    if (services.cloudantNoSQLDB) {
        cloudant_url = services.cloudantNoSQLDB[0].credentials.url;
    }
}

var cloudant = Cloudant({
    url: cloudant_url
});

// check if registrations database exits and create it if not
cloudant.db.get('registrations', function(err, body) {
    if (!err) {
        console.log(body);
    } else {
        cloudant.db.create('registrations', function(err, body) {
            if (!err) {
                console.log('created database for event registrations');
            } else {
                console.log(err);
            }
        });
    }
})

// set registration database
var registrations = cloudant.use('registrations');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log("Listening on port ", port);