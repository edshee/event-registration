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

// check if admin, registrations, events and instances databases exist and create if not
cloudant.db.get('instances', function(err, body) {
    if (!err) {
        console.log(body);
    } else {
        cloudant.db.create('instances', function(err, body) {
            if (!err) {
                console.log('created database for event instances');
            } else {
                console.log(err);
            }
        });
    }
})

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

cloudant.db.get('admin', function(err, body) {
    if (!err) {
        console.log(body);
    } else {
        cloudant.db.create('admin', function(err, body) {
            if (!err) {
                console.log('created database for admin stuff');
            } else {
                console.log(err);
            }
        });
    }
})

// set database variables
var instances = cloudant.use('instances');
var registrations = cloudant.use('registrations');
var events = cloudant.use('events');
var admin = cloudant.use('admin');

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

// post admin details (title, colors, description of site etc..)
app.post('/api/admin/details', function(req, res) {
    admin.insert(req.body, 'details', function(err, body) {
        if (!err) {
            console.log('updated admin details');
            res.send(body);
        } else {
            console.log(err);
            res.send('error encounter. check logs for details');
        }
    });
})

// get admin details (title, colors, description of site etc...)
app.get('/api/admin/details', function(req, res) {
    admin.get('details', function(err, data) {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
            res.send('got error, check logs');
        }
    });
})

// event creation endpoint
app.post('/api/event/create', function(req, res) {
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

// instance creation endpoint
app.post('/api/instance/create', function(req, res) {
    instances.insert(req.body, function(err, body) {
        if (!err) {
            console.log('created new instance ' + body.id);
            res.send(body);
        } else {
            console.log(err);
            res.send('error encounter. check logs for details');
        }
    })
})

// delete an instance
app.delete('/api/instance/:id/:rev', function(req, res) {
    instances.destroy(req.params.id, req.params.rev, function(err, body) {
        if (!err) {
            console.log(body);
            res.send('sucessfully deleted instance');
        } else {
            console.log(err);
            res.send('got error, check logs');
        }
    });
})

// get a specific instance
app.get('/api/instance/:id', function(req, res) {
    instances.get(req.params.id, function(err, data) {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
            res.send('got error, check logs');
        }
    });
})

// get all events
app.get('/api/instances/all', function(req, res) {
    instances.list(function(err, body) {
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