// creating server with arrow function

// var http = require('http');
// http.createServer((req, res) => {
//     res.writeHead(200, { "content-type": "text/html" });
//     res.write("<h1>hello node js</h1>");
//     res.end();
// }).listen(8080);


var http = require('http');

function myfun(req, res) {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>hello node js skahkd</h1>");
    res.end();
}  

http.createServer(myfun).listen(8080);