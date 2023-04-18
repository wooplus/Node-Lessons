const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logEvents");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const { error } = require("console");
const corsOptions = require("./config/corsOptions");

const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

app.use(cors(corsOptions));

// built in middleware to handle urlencoded data
// in other words, form data:
// content type : application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// built-in-middleware for json data
app.use(express.json());

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/root"));

app.use("/employees", require("./routes/api/employees"));

app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));

app.all("*", (req, res) => {
  res.status(404);
  console.log(req.accepts("html"));
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
