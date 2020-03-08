//Install express server

const http = require('http');
const express = require('express');
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
//const MONGO_CLIENT = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const path = require('path');

const app = express();

http.createServer(function (request, response){
  response.writeHead(200, {'Content-type': 'text/plain'});
}).listen(8080);

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname + '../src/index.html'));
});


const hostname = '3.134.92.177';
//const hostname = '127.0.0.1';
//const hostname = '18.216.27.105';

console.log(`Server running at http://${hostname}:${port}/`);

// Node.js body parsing middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

var db;


//app.use(session({secret: 'example'}));

//////////////- - - - - -MONGO- - - - - -//////////////////////////
//Connection to MongoDB - sets the variable db as our database
//MongoClient.connect(url, function(err, database) {
//    if (err) throw err;
//    db = database;
//    app.listen(8080);
//    console.log('Mongo listening on 8080');
//});

///////////////- - - - - -END OF MONGO- - - - - -////////////////////////

//app.use(express.static("public"));

app.get('/*', function(req,res) {
    res.render('pages/index');
});

///////////////////////////////////////////////////////////////////
