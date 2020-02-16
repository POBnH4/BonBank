const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World....!');
}).listen(port);

console.log(`Server running at http://${hostname}:${port}/`);
