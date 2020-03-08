//Install express server

const http = require('http');
const express = require('express');
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/"; // localhost 8080 or 8090?
const path = require('path');

const app = express();
const hostname = '3.134.92.177';
const port = 8080;
http.createServer(function (request, response){
  response.writeHead(200, {'Content-type': 'text/plain'});
  response.end('Hello')
}).listen(port);
    
//res.sendFile(path.join(__dirname + '../src/index.html'));
//});

//const hostname = '127.0.0.1';
//const hostname = '18.216.27.105';

console.log(`Server running at http://${hostname}:${port}/`);

// Node.js body parsing middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

var db;

app.use(session({secret: 'example'}));

//////////////- - - - - -MONGO- - - - - -//////////////////////////
//Connection to MongoDB - sets the variable db as our database
MongoClient.connect(url, function(err, database) {
    if (err) throw err;
    db = database;
    app.listen(8090);
    console.log('Mongo listening on 8090');
});

app.get('/profile', function(req,res) {
    var uname = req.session.username;
    if (req.session.loggedin) {
        db.collection('users').findOne({"username":uname}, function(err,result) {
            if (err) throw err;
            res.render('pages/profile', {
                "user": result
            });
        });
    }
    else {
        res.redirect('/');
    }
});

app.get('/logout', function(req,res) {
    req.session.loggedin = false;
    req.session.destroy();
    res.redirect('/');
});

app.post('/login', function(req,res){
    console.log(JSON.stringify(req.body));
    var username = req.body.username;
    var pword = req.body.password;
    db.collection('users').findOne({"username":username}, function(err,result) {
        if (err) throw err;
        if (!result) {
            res.redirect('/'); //TODO add POP up not found?
            return;
        }
        if (result.password == pword) {
            req.session.loggedin = true;
            req.session.username = result.username;
            res.redirect('/profile');
        }
        else {
            console.log("Incorrect password!");
            res.redirect('/');
        }
    });
});

///////////////- - - - - -END OF MONGO- - - - - -////////////////////////

//app.use(express.static("public"));

app.get('/*', function(req,res) {
    res.render('pages/index');
});

///////////////////////////////////////////////////////////////////
