var http = require('http');
var url = require("url")
function serverstart(routes, handle) {
    http.createServer(function (req, res) {
        var pathname = url.parse(req.url, true).pathname;
        res.writeHead(200, { "content-type": "text/html" });
        if (pathname != "/favicon.ico") {
            req.setEncoding("utf-8");
            let postdata = "";
            req.addListener("data", (chunk) => {
                postdata += chunk;
            });
            req.addListener("end", () => {
                routes(handle, pathname, res, postdata, req);
            });
        } 
    
    }).listen(8080);
}
exports.serverstart = serverstart; 