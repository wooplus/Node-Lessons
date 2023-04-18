const fs = require("fs");

if (!fs.existsSync("./public")) {
  fs.mkdir("./public", (err) => {
    if (err) throw err;
    console.log("Directory created");
  });
} else {
  console.log("directory already existed");
}
