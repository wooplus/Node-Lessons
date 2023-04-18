const http = require("http");
const paths = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const logEvents = require("./logEvents");
const EventEmitter = require("events");
const { response } = require("express");

class Emitter extends EventEmitter {}
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");

  const extension = paths.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "text/jpeg";
      break;
    case ".png":
      contentType = "text/png";
      break;
    case ".plain":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? paths.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? paths.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? paths.join(__dirname, "views", req.url)
      : paths.join(__dirname, req.url);
  // make .html extensions not required in the browser
  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const fileExists = fs.existsSync(filePath);
  if (fileExists) {
    // serve the file
    serveFile(filePath, contentType, res);
  } else {
    //404
    //301 redirect
    switch (paths.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        // serve a 404 response
        serveFile(paths.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "utf8" : ""
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    myEmitter.emit("log", `${err.name}\t${err.message}`, "errLog.txt");
    response.statusCode = 500;
    response.end();
  }
};
