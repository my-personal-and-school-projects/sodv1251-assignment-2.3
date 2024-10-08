const http = require("http");
const fs = require("fs");
const path = require("path");

/**
 * helper to serve the files
 * @param {*} res
 * @param {*} filePath
 * @param {*} contentType
 */
function serveFiles(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
}

//Create the server
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // Serve the index page
    serveFiles(res, "./public/index.html", "text/html");
  } else if (req.url.startsWith("/menu")) {
    // Serve the menu page
    serveFiles(res, "./public/pages/menu.html", "text/html");
  } else if (req.url === "/menu-food") {
    //Serve food menu page
    serveFiles(res, "./public/pages/menu-food.html", "text/html");
  } else if (req.url.startsWith("/order")) {
    //serve the order review page
    serveFiles(res, "./public/pages/order.html", "text/html");
  } else if (req.url === "/cart") {
    //serve the cart page
    serveFiles(res, "./public/pages/cart.html", "text/html");
  } else {
    // Serve static files (CSS, JS, images)
    const filePath = path.join(__dirname, "public", req.url);

    // Check the file extension for content type
    const extname = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      ".css": "text/css",
      ".js": "application/javascript",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".ico": "image/x-icon",
    };
    const contentType = mimeTypes[extname] || "text/plain";

    fs.readFile(filePath, (err, data) => {
      if (err) {
        // If the file is not found, send a 404 response
        if (err.code === "ENOENT") {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404: File Not Found");
        } else {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        }
      } else {
        //Check if any of the served files should be cached
        const cacheable = [
          ".css",
          ".js",
          ".png",
          ".jpg",
          ".jpeg",
          ".ico",
        ].includes(extname);

        const headers = { "Content-Type": contentType };

        if (cacheable) {
          //set TTL to 24hrs
          headers["Cache-Control"] = "public, max-age=86400";
        }

        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  }
});

//Start the server
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
