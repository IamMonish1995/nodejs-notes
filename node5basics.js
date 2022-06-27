console.log(__filename);
console.log(__dirname);

function printmsg() { 
    console.log("hello print called");
}
setTimeout(printmsg, 3000);
setInterval(printmsg, 1000);