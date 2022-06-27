var path = require("path").posix;
// Normalization
console.log('normalization : ' + path.normalize('/test/test1//2slashes/1slash/tab/..'));

// Join
console.log('joint path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));

// Resolve
console.log('resolve : ' + path.resolve('node6url.js'));

// extName
console.log('ext name : ' + path.extname('main.js'));

let mypath = "D:/nodejs/node23pathutility.js";
console.log(path.isAbsolute(mypath));

path1 = path.relative("geeks/website", "geeks/index.html");
console.log(path1)
console.log("Directory name : " + path.dirname(mypath));

console.log("Path base " + path.basename(mypath));
console.log(path.parse(mypath));
let pathobj = path.parse(mypath);
console.log(path.format(pathobj));
console.log(path.sep);
// console.log(path.posix);
console.log(path.delimiter);
console.log(path.win32);