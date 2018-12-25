// Using ES5

// importing http module
var http = require('http');

// creating simple http server using node js by using http module.
// http module gives createServer method to create server which takes a callback as an argument.
// Callback takes two arguments, fist one has request and second has response. The name of these arguments is upon developers choice.
// For easy understanding I have named them as req and res.
// response gives writeHead method which is used to set headers for response.
// headers tells the nature of response.
// writeHead takes two arguments, fist one is response status and second is response data format.
// 200 respose status means OK, simply means resource found. There are many more response status we can find on google.
// second argument is always in stringified JSON format. 'Content-Type': 'text/plain' tells the server that the data it receives will be plain text.
// res gives end method which finally ends or completes the response by providing the received data.
// In this example I have just passed string data to end the result.
// createServer provides listen method to tell the node js about the port on which the server will run.
// I have choosed port 3000. It depend on your choice but first confirm that the port is free.
// Whenever a request happens, the function (req, res) callback is fired and “Hello First Test Node Server” is written out as the response.
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello First Test Node Server\n')
}).listen(3000);

console.log('Server running at http://localhost:3000/');

// cd to working directory, e.g. 1_hello_world_http_server
// run command: "node test1_server.js" in the terminal to start server.
// Goto your browser and enter the url http://localhost:3000/.
// To stop server just press ctrl+c in the terminal where server is running.