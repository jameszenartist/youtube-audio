const chalk = require("chalk");
const os = require("os");
// const https = require("https");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const URL = require("url");
const platform = os.platform();

//edit later to target how to
// navigate to downloads folder
//depending on operating system
if (platform === "win32") {
  console.log("Running on Windows");
} else if (platform === "linux") {
  console.log("Running on Linux");
} else if (platform === "darwin") {
  console.log("Running on macOS");
} else {
  console.log(`Running on ${platform}`);
}

// const url = "https://www.youtube.com/watch?v=IRi_hCXNYRo&ab_channel=PaulOrtiz";
const url =
  "https://www.youtube.com/watch?v=Fji7XbhQ-P0&ab_channel=SumerianRecords";
let parsedURL = URL.parse(url, true);
// console.log(`parsed url is: ${JSON.stringify(parsedURL)}`);
let pathname = parsedURL.pathname;
pathname = pathname.replace(/^\/+|\/+$/g, "");

// console.log(pathname);

//this path works for linux machine:
const downloadsPath = path.join(`${process.env.HOME}`, "Downloads");
console.log(`download path is: ${downloadsPath}`);

//to ensure filename is temporarily differnt:
let val = Math.floor(Math.random() * 10) + 1;
const stream = ytdl(url, { filter: "audioonly" });
// const output = fs.createWriteStream(
//   `${__dirname}/${parsedURL.query.ab_channel}${val}.mp3`
// );
const output = fs.createWriteStream(
  `${downloadsPath}/${parsedURL.query.ab_channel}${val}.mp3`
);
stream.pipe(output).on("finish", () => {
  console.log(chalk.green(`The download is complete!`));
});
