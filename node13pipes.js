var fs = require("fs");
var rstream = fs.createReadStream("node8myfile.txt");
var wstream = fs.createWriteStream("node13outputfile.txt");
rstream.pipe(wstream);
console.log("file copied");