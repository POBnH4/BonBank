r

const http = require('http');
const express = require('express'); //npm install express
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
const MongoClient = require('mongodb').MongoClient; //npm install mongodb
const url = "mongodb://localhost:27017/"; // localhost 8080 or 8090?
const path = require('path');
const app = express();
const hostname = '3.134.92.177';
const port = 8080;

var db;

http.createServer(function (request, response){
  response.writeHead(200, {'Content-type': 'text/plain'});
  response.end('Hello')
}).listen(port);
    
//res.sendFile(path.join(__dirname + '../src/index.html'));
//});

console.log(`Server running at http://${hostname}:${port}/`);


app.use(bodyParser.urlencoded({ // Node.js body parsing middleware
    extended: true
}));




//app.use(express.static("public"));

app.get('/*', function(req,res) {
    res.render('pages/index');
});

app.use(session({secret: 'example'}));

//- - - - - - - - - - - -MONGO- - - - - - - - - - - -//
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

app.post('/register', function(req,res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var pword = req.body.password;
    console.log(name " " + email)
    var newUserData = {
        "name": name,
        "email": email,
        "totalBalance": 0.0,
        "username": username,
        "password": pword,
        "transactions": []
    };
    db.collection('users').findOne({"username":username}, function(err,result) {
        if (err) throw err;
        if (result) {
            console.log("Username taken");
            res.redirect('/');
        }
    });
    db.collection('users').save(newUserData, function(err,result) {
        if (err) throw err;
        console.log(username + " saved to Database");
    });
    return res.status(200).JSON({
      message: "User registered!";
      res.redirect('/');
    })
});
///////////////////////////////////////////////////////////////////
