// Using ES5

// importing http module
var http = require('http');

// importing filesystem(fs) module
var fs = require('fs');

// creating simple http server using node js by using http module.
// http module gives createServer method to create server which takes a callback as an argument.
// Callback takes two arguments, fist one has request and second has response. The name of these arguments is upon developers choice.
// For easy understanding I have named them as req and res.
// response gives writeHead method which is used to set headers for response.
// headers tells the nature of response.
// writeHead takes two arguments, fist one is response status and second is response data format.
// 200 respose status means OK, simply means resource found. There are many more response status we can find on google.
// second argument is always in stringified JSON format. 'Content-Type': 'image/png' tells the server that the data it receives will be a png image.
// creating a read stream using node js by using fs module.
// fs module gives createReadStream method to create stream which takes data resource path as an argument.
// createReadStream gives a pipe method which is used to convert the readable stream to a writable stream.
// createServer provides listen method to tell the node js about the port on which the server will run.
// I have choosed port 3000. It depend on your choice but first confirm that the port is free.
// Whenever a request happens, the function (req, res) callback is fired and image is shown on the screen as the response.
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'image/png'});
    fs.createReadStream('./flower.png').pipe(res);    
}).listen(3000);

console.log('Server running at http://localhost:3000/');

// cd to working directory, e.g. 2_streaming_data
// run command: "node test2_stream_data_on_http_server.js" in the terminal to start server.
// Goto your browser and enter the url http://localhost:3000/.
// To stop server just press ctrl+c in the terminal where server is running.