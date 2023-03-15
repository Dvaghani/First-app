const os = require('os');

//here is the how we can calculate the total memory in node.js
var tm = os.totalmem();
var fm = os.freemem();

console.log('Total Memory:' + tm);