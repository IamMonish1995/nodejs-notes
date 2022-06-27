var myserver = require("./server");
var myrouter = require("./router");
myserver.serverstart(myrouter.home);