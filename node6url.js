var http = require('http');
function myfun(req, res) {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(req.url);
    res.end();
}
http.createServer(myfun).listen(8080);
// read data from url after "/"

// "/" k bad ka url aaega