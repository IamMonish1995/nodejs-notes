var fs = require("fs");
var zlib = require("zlib");
fs.createReadStream("node8myfile.txt")
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream("node14myfile.txt.zip"));
