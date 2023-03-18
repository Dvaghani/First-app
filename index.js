const fs = require("fs");
const http = require("http");
const url = require('url');
// //Blocking, sync
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/templates-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/templates-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/templates-card.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const replceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  return output;
};
// console.log(readfile);

// const writefile = `${readfile} Dhruvit.\n time:${Date.now()}`
// fs.writeFileSync('./text/output.txt',writefile);

// //Non-blocking, Async
// fs.readFile("./text/input.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });
// console.log("Reading file");
// fs.readFile("./dev-data/data.json", "utf-8", (err, data) => {
//   if (err) throw err;
// });

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardhtml = dataObj.map((el) => replceTemplate(tempCard, el)).join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardhtml);
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else if (pathname === "/product") {
    res.writeHead(200,{ "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replceTemplate(tempProduct, product);
    res.end(output);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello header",
    });
    res.end("Page not found");
  }
});

server.listen(8000, "localhost", () => {
  console.log("Server strated on port 8000");
});
