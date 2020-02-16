const http = require('http');
const express = require('express');
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
//const MONGO_CLIENT = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/chess";
var app = express();

//const hostname = '18.216.27.105';
const hostname = '127.0.0.1';
const port = 8080;

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World....!');
}).listen(port);

console.log(`Server running at http://${hostname}:${port}/`);

// Node.js body parsing middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

var db;

app.set('view engine', 'ejs');
app.use(express.static("public"));
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

app.get('/MyPersonalDiary', function(req,res) {
    res.render('pages/index');
});

///////////////////////////////////////////////////////////////////

var board1 = Chessboard('board1', {
  draggable: true,
  dropOffBoard: 'trash',
  sparePieces: true

}

$('#startBtn').on('click', board1.start)
$('#clearBtn').on('click', board1.clear)

//  const PORT = process.env.PORT || 8080;
  // set the port based on environment (more on environments later)
  //var port = PORT;
  // send our index.html file to the user for the home page
//  app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html');
//  });
  // start the server
//  app.listen(PORT);
//  console.log('Express Server running at http://127.0.0.1:'.PORT);
