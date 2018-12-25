// Using ES5

// importing filesystem(fs) module
var fs = require('fs');

// creating simple read stream using node js by using fs module.
// fs module gives createReadStream method to create stream which takes data resource path as an argument.
// stored the result returned from createReadStream method in stream vaiable.
var stream = fs.createReadStream('./resource.json');

// stream variable provides 'on' method to handle stream.
// on method takes two arguments, fist one is event as string and second has callback.
// Callback takes argument which stored the received chunk of data in it. The name of these arguments is upon developers choice.
// For easy understanding I have named it as chunk.
// Chunk can vary in size, depending on the type of data.

// 'data' event is fired when new chunk is ready
// JSON.parse method is used to convert stringified JSON data into JavaScript object.
stream.on('data', function(chunk){
    console.log(JSON.parse(chunk))
});

// 'end' event is fired when all chunks have been loaded
stream.on('end', function(){
    console.log('Finished')
})

// cd to working directory, e.g. 2_streaming_data
// run command: "node test1_stream_data.js" in the terminal see the result.