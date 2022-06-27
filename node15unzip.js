var fs = require("fs");
var zlib = require("zlib");
fs.createReadStream("node14myfile.txt.zip")
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream("node15unzipmyfile.txt"));
