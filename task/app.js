var server = require("./server");
var router = require("./router");
var handler = require("./handler");

var handle = {};

handle["/register"] = handler.register;
handle["/registered"] = handler.registered;
handle["/login"] = handler.login;
handle["/profile"] = handler.profile;
handle["/editprofile"] = handler.editprofile;
handle["/updateprofile"] = handler.updateprofile;
handle["/admindashboard"] = handler.admindashboard;
handle["/edituser"] = handler.edituser;
handle["/deleteuser"] = handler.deleteuser;

server.serverstart(router.route, handle);  