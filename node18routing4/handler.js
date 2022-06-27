const qstring = require("querystring");
function home(res) { 
    console.log("executing home handles");
    var htmlfile = `
                <form action="/review" method="post">
                    <label for="fname">Name</label>
                    <input id="fname" type="text" name="fname" placeholder="name"><br>
                    <label for="email">Email</label>
                    <input id="email" type="text" name="email" placeholder="email"><br>
                    <input type="submit" value="Submit">
                </form>`;
    res.write(htmlfile);
    res.end();
}


function review(res, postdata) {
    let fname = qstring.parse(postdata).fname;
    let email = qstring.parse(postdata).email;
    res.write("<h1>hello " + fname + " </h1>" + "<br>" + "<h1>Your Email is  " + email +" </h1>")
    res.end();
}
exports.home = home;
exports.review = review; 