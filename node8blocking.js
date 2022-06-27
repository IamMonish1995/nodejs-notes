var fs = require("fs");
var data = fs.readFileSync("node8myfile.txt");
console.log(data.toString());
console.log("program ended");