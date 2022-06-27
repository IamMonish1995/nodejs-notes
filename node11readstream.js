var fs = require("fs");
var rstream = fs.createReadStream("node8myfile.txt");
rstream.setEncoding("utf-8");
let data = "";
rstream.on("data", function (chunk) {
    data += chunk;
});
rstream.on("end", function () {
    console.log(data);
});
rstream.on("error", function (errrr) {
    console.log(errrr);
});
console.log("program ended");