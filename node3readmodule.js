var http = require('http');
var mymod = require("./node3mymodule.js")

http.createServer(function (req, res) {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(mymod.hello());
    res.end();
}).listen(8080);

//console.log(mymod.hello1());