const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

// const fileOps = async () => {
//   try {
//     const data = await fsPromises.readFile(
//       path.join(__dirname, "files", "starter.txt"),
//       "utf8"
//     );
//     console.log(data);
//     await fsPromises.writeFile(
//       path.join(__dirname, "files", "promiseWriter.txt"),
//       data
//     );
//     await fsPromises.unlink(path.join(__dirname, "files", "lorem.txt"));
//     await fsPromises.appendFile(
//       path.join(__dirname, "files", "promiseWriter.txt"),
//       "\n\nAppending complete"
//     );
//     await fsPromises.rename(
//       path.join(__dirname, "files", "promiseWriter.txt"),
//       path.join(__dirname, "files", "asyncPromise.txt")
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };
// fileOps();

// // fs.readFile(
// //   path.join(__dirname, "files", "starter.txt"),
// //   "utf-8",
// //   (err, data) => {
// //     if (err) throw err;
// //     console.log(data);
// //   }
// // );

// // fs.writeFile(
// //   path.join(__dirname, "files", "test.txt"),
// //   "nice to meet who are you?",
// //   (err) => {
// //     if (err) throw err;
// //     console.log("operation complete");
// //     fs.appendFile(
// //       path.join(__dirname, "files", "test.txt"),
// //       "\nYes it is!",
// //       (err) => {
// //         if (err) throw err;
// //         console.log("append complete");
// //       }
// //     );
// //   }
// // );

// console.log("hello ...");

fs.readFile(path.join(__dirname, "files", "index.html"), (err, data) => {
  console.log(data.toString());
});

// exit on uncaught errors
process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught error ; ${err}`);
  process.exit(1);
});
