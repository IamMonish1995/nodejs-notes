var events = require("events");
var event = new events.EventEmitter();

function callfun() { 
    console.log("this is call back fun");
    event.emit("print");// callung function
}
function printdata() { 
    console.log("print data called");
}

event.on("calling", callfun); // binding function
event.on("print", printdata); // binding function


event.emit("calling"); // calling function