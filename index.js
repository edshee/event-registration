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

// check if config, registrations and events databases exist and create if not
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

cloudant.db.get('events', function(err, body) {
    if (!err) {
        console.log(body);
    } else {
        cloudant.db.create('events', function(err, body) {
            if (!err) {
                console.log('created database for eventy stuff');
            } else {
                console.log(err);
            }
        });
    }
})

cloudant.db.get('config', function(err, body) {
    if (!err) {
        console.log(body);
    } else {
        cloudant.db.create('config', function(err, body) {
            if (!err) {
                console.log('created database for config stuff');
            } else {
                console.log(err);
            }
        });
    }
})

// set database variables
var registrations = cloudant.use('registrations');
var events = cloudant.use('events');
var config = cloudant.use('config');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

// forward to admin page
app.get('/admin', function(req, res) {
    res.redirect('/admin.html');
})

// forward to registrations page
app.get('/registrations', function(req, res) {
    res.redirect('/registrations.html');
})

// post config details (title, colors, description of site etc..)
app.post('/api/config', function(req, res) {
    config.insert(req.body, 'details', function(err, body) {
        if (!err) {
            console.log('updated config details');
            res.send(body);
        } else {
            console.log(err);
            res.send('error encounter. check logs for details');
        }
    });
})

// get config details (title, colors, description of site etc...)
app.get('/api/config', function(req, res) {
    config.get('details', function(err, data) {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
            res.send('noconfig');
        }
    });
})

// event creation endpoint
app.post('/api/event', function(req, res) {
    events.insert(req.body, function(err, body) {
        if (!err) {
            console.log('created new event ' + body.id);
            res.send(body);
        } else {
            console.log(err);
            res.send('error encounter. check logs for details');
        }
    })
})

// delete an event
app.delete('/api/event/:id/:rev', function(req, res) {
    events.destroy(req.params.id, req.params.rev, function(err, body) {
        if (!err) {
            console.log(body);
            res.send('sucessfully deleted event');
        } else {
            console.log(err);
            res.send('got error, check logs');
        }
    });
})

// get a specific event
app.get('/api/event/:id', function(req, res) {
    events.get(req.params.id, function(err, data) {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
            res.send('got error, check logs');
        }
    });
})

// get all events
app.get('/api/events/all', function(req, res) {
    events.list(function(err, body) {
        var arr = [];
        if (!err) {
            body.rows.forEach(function(doc) {
                arr.push(doc);
            });
            res.send(arr);
        }
    });
})

// registration creation endpoint
app.post('/api/registration', function(req, res) {
    registrations.insert(req.body, function(err, body) {
        if (!err) {
            console.log('created new registration ' + body.id);
            res.send(body);
        } else {
            console.log(err);
            res.send('error encounter. check logs for details');
        }
    })
})

// delete a registration
app.delete('/api/registration/:id/:rev', function(req, res) {
    registrations.destroy(req.params.id, req.params.rev, function(err, body) {
        if (!err) {
            console.log(body);
            res.send('sucessfully deleted registration');
        } else {
            console.log(err);
            res.send('got error, check logs');
        }
    });
})

// get a specific registration
app.get('/api/registration/:id', function(req, res) {
    registrations.get(req.params.id, function(err, data) {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
            res.send('got error, check logs');
        }
    });
})

// get all registrations
app.get('/api/registrations/all', function(req, res) {
    registrations.list(function(err, body) {
        var arr = [];
        if (!err) {
            body.rows.forEach(function(doc) {
                arr.push(doc);
            });
            res.send(arr);
        }
    });
})

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log("Listening on port ", port);