// Using ES5

// importing filesystem(fs) module
var fs = require('fs');

// reading resource.json file asyncronously
// In fs.readfile method, fist argument is the relative path of data and second argument is the anonymous function or callback. 
// Callback takes two arguments, fist one has errors and second has data. The name of these arguments is upon developers choice.
// For easy understanding I have named them as error and data.
// JSON.parse method is used to convert stringified JSON data into JavaScript object.
fs.readFile('./resource.json', function(error, data){
    console.log(JSON.parse(data));
})

// cd to working directory, e.g. simple_async_example
// run command: "node app.js" in the terminal to see the result. 