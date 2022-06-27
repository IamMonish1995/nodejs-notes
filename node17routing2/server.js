var http = require('http');
var url = require("url")
function serverstart(routes) {    
    http.createServer(function (req, res) {
        var pathname = url.parse(req.url, true).pathname;
        routes(pathname);
        res.writeHead(200, { "content-type": "text/html" });
        res.write("<h1>hello node js</h1>");
        res.end();
    }).listen(8080);
}
exports.serverstart = serverstart;