var fs = require("fs");
fs.readFile("node8myfile.txt", (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data.toString());
});
console.log("program ended");