const http = require("http");
const fs = require("fs");

//Create the server
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    //serve the  index.html
    fs.readFile("index.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else {
    // Handle other routes with 404 status code
    res.writeHead(404, { "COntent-Type": "text/plain" });
    res.end("Page Not Found");
  }
});

//Start the server
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
