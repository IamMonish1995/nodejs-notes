var fs = require("fs");
var data = "my name is monish";
var wstreame = fs.createWriteStream("node12output.txt");
wstreame.write(data, "utf-8");
wstreame.end();
wstreame.on("finish", function () {
    console.log("write completed");
});
wstreame.on("error", function (err) {
    console.log(err);
});
console.log("program ended");