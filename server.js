console.log("Famgy create http-server...")

const http = require("http");
const url = require("url")

function start(route, handle) {
    function onRequest(request, response) {

        const pathname = url.parse(request.url).pathname;
        if (pathname == "/favicon.ico") {
            return;
        }

        console.log("Request : " + pathname);

        route(handle, pathname, response, request);
    }

    http.createServer(onRequest).listen(8888);

    console.log("Famgy'sServer has started.");
    console.log("------\n\n");
}

exports.start = start;