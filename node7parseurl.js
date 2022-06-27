var url = require("url");
var http = require("http");

http.createServer((req, res) => {
    
    res.writeHead(200, { "content-type": "text/html" });
    
    let urldata = url.parse(req.url, true).query;
    res.write("<h1>first name =" + urldata.fname + "</h1>");
    res.write("<h1>Last name =" + urldata.lname + "</h1>");
    res.write("<h1>Email =" + urldata.email + "</h1>");
    
    res.end();

}).listen(8080);