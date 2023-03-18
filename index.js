const fs = require("fs");
const http = require("http");
// //Blocking, sync
// const readfile = fs.readFileSync('./text/input.txt','utf-8');
// console.log(readfile);

// const writefile = `${readfile} Dhruvit.\n time:${Date.now()}`
// fs.writeFileSync('./text/output.txt',writefile);

// //Non-blocking, Async
// fs.readFile("./text/input.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });
// console.log("Reading file");

const server = http.createServer((req, res) => {
  const pathnName = req.url;
  if (pathnName === "/" || pathnName === "/overview") {
    res.end("This is overview");
  } else if (pathnName === "/product") res.end("This is product");
  else res.end("Page not found");
});

server.listen(8000, "localhost", () => {
  console.log("Server strated on port 8000");
});
