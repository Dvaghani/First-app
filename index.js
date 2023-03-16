const fs = require('fs');

const readfile = fs.readFileSync('./text/input.txt','utf-8')
console.log(readfile)

const writefile = `${readfile} Dhruvit.\n time:${Date.now()}`
fs.writeFileSync('./text/output.txt',writefile)