const queryString = require("querystring");
const fs = require("fs");
const formidable = require("formidable")

function start(response, request) {
    console.log("Handler : 'start' was called.\n");

    const body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; charset="UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="file" name="upload" multiple="multiple" />' +
        '<input type="submit" value="Submit text" />' +
        '</form>' +
        '</body>' +
        '</html>';


    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Handler : 'upload' was called.\n");

    const form = formidable({multiple: true});
    console.log("formidable to parse.")
    form.parse(request, function (error, fields, files) {
        console.log("formidable parse done.")

        if (error) {
            return;
        }

        fs.renameSync(files.upload.path, "/tmp/test.png")

        response.writeHead(200, {"Content-Type":"text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    })
}

function show(response, request) {
    console.log("Handler : 'show' was called.\n");

    fs.readFile("/tmp/test.png", "binary", function (error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type":"text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type":"image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;