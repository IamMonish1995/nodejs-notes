var fs = require("fs");
var rstream = fs.createReadStream("./form.html");
rstream.setEncoding("utf-8");
let htmlfile = "";
rstream.on("data", function(chunk){
    htmlfile += chunk;
});
rstream.on("end", function (){
});
const qstring = require("querystring");
function home(res){ 
    console.log("executing home handles");
    res.write(htmlfile);
    res.end();
}

function review(res, postdata){
    let fname = qstring.parse(postdata).name;
    let email = qstring.parse(postdata).email;
    let phone = qstring.parse(postdata).phone;
    let persons = qstring.parse(postdata).persons;
    let date = qstring.parse(postdata).date;
    res.write("Hello " + fname + "<br>" + "Your Email is " + email +"<br>"+"Your Number is"+ phone +"<br>"+"Number of persons"+ persons +"<br>"+"Date"+ date);
    res.end();
}
function database(res) {
    
}

exports.home = home;
exports.review = review;