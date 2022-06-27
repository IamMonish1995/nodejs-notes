
var fs = require("fs");
const { ObjectId } = require("mongodb");
var rstream = fs.createReadStream("./register.html");
rstream.setEncoding("utf-8");
let htmlfile = "";
rstream.on("data", function (chunk) {
    htmlfile += chunk;
});
rstream.on("end", function () {
});
const qstring = require("querystring");
function register(res) {
    console.log("executing register handles");
    res.write(htmlfile);
    res.end();
}
function registered(res, postdata) {
    let username = qstring.parse(postdata).username;
    let name = qstring.parse(postdata).name;
    let email = qstring.parse(postdata).email;
    let password = qstring.parse(postdata).password;
    let state = qstring.parse(postdata).state;
    let city = qstring.parse(postdata).city;
    let number = qstring.parse(postdata).number;

    let MongoClient = require('mongodb').MongoClient;
    let url = "mongodb://127.0.0.1:27017/";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mytaskdb");
        var myobj = { "username": username, "name": name, "number": number, "email": email, "password": password, "state": state, "city": city };
        dbo.collection("userdata").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });

    res.write("<h1>hello " + name + " </h1>" + "<br>" + "<h1>Your Username is  " + username + " </h1>" + "<h1>Your Password is  " + password + " </h1>")
    res.write(`<a href="/login">login now</a>`)
    res.end();
}
function login(res) {
    res.write(` <form action="/profile" method="post">
                <input type="text" placeholder="Username" name="loginuserid" >
                <input type="text" placeholder="Password" name="loginpassword" >
                <button class="btn btn-primary">Submit</button>
                <a href="/register">Register</a>
                </form>`)
    res.end();
}
function profile(resp, postdata) {
    let loginid = qstring.parse(postdata).loginuserid;
    let loginpass = qstring.parse(postdata).loginpassword;
    // resp.write("Welcome");
    let MongoClient = require('mongodb').MongoClient;
    let url = "mongodb://127.0.0.1:27017/";
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mytaskdb");
        dbo.collection("userdata").findOne({ "username": loginid }, function (err, result) {
            if (err) throw err;
            db.close();
            if (loginid == "admin" && loginpass == "admin") {
                admindashboard(resp);
            } else {
                if (result !== null) {
                    if (loginid == result.username && loginpass == result.password) {
                        editprofile(resp, result);
                    } else {
                        resp.write("Password is incorrect" + `<br>`);
                        resp.write(`<a href="/login">Try again</a>`);
                        resp.end();
                    }
                } else {
                    resp.write("Username is incorrect" + `<br>`);
                    resp.write(`<a href="/login">try again</a>`);
                    resp.end();
                }
            }
        });
    });
}

function editprofile(resp, result) {
    let editfrm = `
    <!DOCTYPE html>
            <html lang="en">
            <head> 
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
            <title>Registration form using bootstrap and jqury</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js"
                integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=" crossorigin="anonymous"></script>
            </head>
            <body>
            <form action="/updateprofile" method="post" class="container border mt-3" name="validform">
                <div class="row">
                <div class="col-md-12 mb-3 mx-auto"> <h1>HI!!! ${result.name} Update your profile</h1></div>
                </div>
                <div class="row">
                <label for="username">Userame</label>
                <input type="text" placeholder="Username" readonly class="col-md-6 mb-3" value="${result.username}" id="username" name="username">
                </div>
                <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="name">Name</label>
                    <input type="text" autocomplete="name" name="name" class="form-control" id="name" placeholder="Name"
                    value="${result.name}" required />
                    <div class="" id="namefeed"></div>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="number">Number</label>
                    <input type="number" autocomplete="mobile" name="number" length="10" class="form-control" id="number"
                    placeholder="Number" value="${result.number}" required />
                    <div class="" id="numfeed"></div>
                </div>
                </div>
                <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" autocomplete="email" name="email" id="email" placeholder="Email"
                    value="${result.email}" required />
                    <div class="" id="mailfeed"></div>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="pass">Password</label>
                    <input type="password" name="password" autocomplete="current-password" class="form-control" id="pass"
                    placeholder="Password" value="${result.password}" required />
                    <input class="form-check-input" type="checkbox" id="showpassword" onclick="showFunction()" />
                    <label class="form-check-label" for="showpassword">
                    Show Password
                    </label>
                    <div class="" id="passfeed"></div>
                </div>
                </div>
                <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="state">
                    State
                    </label><br>
                    <input type="text" class="form-control" placeholder="state" value="${result.state}" id="state" name="state">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="city">
                    City
                    </label><br>
                    <input type="text" class="form-control" id="city" placeholder="city" value="${result.city}" name="city">
                </div>
                </div>
                <div class="row">
                <div class="col-md-12 mb-3 mt-4" style="text-align: center">
                    <button class="btn btn-primary">Update</button>
                </div>
                </div>
            </form>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                crossorigin="anonymous"></script>
            <script>
                
                // show password
                function showFunction() {
                x = document.getElementById("pass");
                if (x.type === "password") {
                    x.type = "text";
                } else {
                    x.type = "password";
                }
                }
            </script>
            </body>

            </html> `;
    resp.write(editfrm);
    resp.end();
}

function updateprofile(resp, postdata) {
    let username = qstring.parse(postdata).username;
    let name = qstring.parse(postdata).name;
    let email = qstring.parse(postdata).email;
    let password = qstring.parse(postdata).password;
    let state = qstring.parse(postdata).state;
    let city = qstring.parse(postdata).city;
    let number = qstring.parse(postdata).number;

    let MongoClient = require('mongodb').MongoClient;
    let url = "mongodb://127.0.0.1:27017/";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mytaskdb");
        var myquery = { "username": username };
        var newvalues = { $set: { "name": name, "email": email, "password": password, "state": state, "city": city, "number": number } };
        dbo.collection("userdata").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            db.close();
            resp.write("Your profile has Updated");
            resp.end();
        });
    });
};

function admindashboard(resp) {
    resp.write("<h1> Hii!!! Admin </h1>");
    let MongoClient = require('mongodb').MongoClient;
    let url = "mongodb://127.0.0.1:27017/";
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mytaskdb");
        dbo.collection("userdata").find({}).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);

            str = "";
            for (let i = 0; i < result.length; i++) {
                str += `<tr>
                  <td>${[i + 1]}</td>
                  <td>${result[i].username}</td>
                  <td>${result[i].name}</td>
                  <td>${result[i].email}</td>
                  <td>${result[i].number}</td>
                  <td>${result[i].password}</td>
                  <td>${result[i].state}</td>
                  <td>${result[i].city}</td>
                  <td><a href="/edituser?userid=${result[i]._id}">Edit</a></td>
                  <td><a href="/deleteuser?userid=${result[i]._id}">Delete</a></td>
                  </tr >`};

            let tble = `<style>body {
      margin: 0px;
      padding: 10px 50px;
    }
    .formstyle {
      padding: 20px;
    }
    #preview {
      cursor: pointer;
    }
    table{
      border: 1px solid black;
      border-collapse: collapse;
    }
    td,th{
      border: 1px solid black;
      padding: 10px;
    }
            </style>
            <div class="table">
        <table >
          <thead>
            <tr>
              <th>Sr</th>
              <th>UserName</th>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Password</th>
              <th>State</th>
              <th>Cities</th>
              <th colspan="2">Action</th>
            </tr>
          </thead>
          <tbody>
          ${str}
          </tbody>
        </table>
      </div>
    </fieldset>
  </form>
  `
            resp.write(tble)
            db.close();
            resp.end();
        });
    });
}
let url = require("url");
function edituser(resp, pdata, req) {
    let qurl = url.parse(req.url, true).query;
    let userid = qurl.userid;
    
    let MongoClient = require('mongodb').MongoClient;
    let durl = "mongodb://127.0.0.1:27017/";
    MongoClient.connect(durl, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mytaskdb");
        dbo.collection("userdata").findOne({ "_id": ObjectId(userid) }, function (err, result) {
            if (err) throw err;
            db.close();
            let editfrm = `
    <!DOCTYPE html>
            <html lang="en">
            <head> 
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
            <title>Registration form using bootstrap and jqury</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js"
                integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=" crossorigin="anonymous"></script>
            </head>
            <body>
            <form action="/updateprofile" method="post" class="container border mt-3" name="validform">
                <div class="row">
                <div class="col-md-12 mb-3 mx-auto"> <h1>HI!!! Admin </h1></div>
                </div>
                <div class="row">
                <label for="username">Userame</label>
                <input type="text" placeholder="Username" readonly class="col-md-6 mb-3" value="${result.username}" id="username" name="username">
                </div>
                <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="name">Name</label>
                    <input type="text" autocomplete="name" name="name" class="form-control" id="name" placeholder="Name"
                    value="${result.name}" required />
                    <div class="" id="namefeed"></div>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="number">Number</label>
                    <input type="number" autocomplete="mobile" name="number" length="10" class="form-control" id="number"
                    placeholder="Number" value="${result.number}" required />
                    <div class="" id="numfeed"></div>
                </div>
                </div>
                <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" autocomplete="email" name="email" id="email" placeholder="Email"
                    value="${result.email}" required />
                    <div class="" id="mailfeed"></div>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="pass">Password</label>
                    <input type="password" name="password" autocomplete="current-password" class="form-control" id="pass"
                    placeholder="Password" value="${result.password}" required />
                    <input class="form-check-input" type="checkbox" id="showpassword" onclick="showFunction()" />
                    <label class="form-check-label" for="showpassword">
                    Show Password
                    </label>
                    <div class="" id="passfeed"></div>
                </div>
                </div>
                <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="state">
                    State
                    </label><br>
                    <input type="text" class="form-control" placeholder="state" value="${result.state}" id="state" name="state">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="city">
                    City
                    </label><br>
                    <input type="text" class="form-control" id="city" placeholder="city" value="${result.city}" name="city">
                </div>
                </div>
                <div class="row">
                <div class="col-md-12 mb-3 mt-4" style="text-align: center">
                    <button class="btn btn-primary">Update</button>
                </div>
                </div>
            </form>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                crossorigin="anonymous"></script>
            <script>
                
                // show password
                function showFunction() {
                x = document.getElementById("pass");
                if (x.type === "password") {
                    x.type = "text";
                } else {
                    x.type = "password";
                }
                }
            </script>
            </body>

            </html> `;
            resp.write(editfrm);
            resp.end();

        });
    });

}
function deleteuser(resp, pdata, req) {
    let qurl = url.parse(req.url, true).query;
    let userid = qurl.userid;
    
    let MongoClient = require('mongodb').MongoClient;
    let durl = "mongodb://127.0.0.1:27017/";
    MongoClient.connect(durl, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mytaskdb");
        dbo.collection("userdata").deleteOne({ "_id": ObjectId(userid) }, function (err, result) {
            if (err) throw err;
            db.close();
            resp.write("User deleted successfully");
            resp.end();
        });
    });
};


exports.register = register;
exports.registered = registered;
exports.login = login;
exports.profile = profile;
exports.editprofile = editprofile;
exports.updateprofile = updateprofile;
exports.admindashboard = admindashboard;
exports.edituser = edituser; 
exports.deleteuser = deleteuser; 