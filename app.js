const os = require('os');

var tm = os.totalmem();
var fm = os.freemem();

console.log('Total Memory:' + tm);