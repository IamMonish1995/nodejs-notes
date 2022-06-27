
function route(handle, pathname ,res ,postdata, req) { 
    // console.log(handle);
    console.log("routing a req for " + pathname + "   " + typeof handle[pathname]);
    if (typeof handle[pathname] === "function") {
        handle[pathname](res , postdata, req);
    } else { 
        res.writeHead(404, { "content-type": "text / html" });
        res.write("<h1>oops!404 page not found");
        res.end();
        // console.log("no handle for "+pathname);
    }
}
 
exports.route = route;  