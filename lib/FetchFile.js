const chalk = require("chalk");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const URL = require("url");

function FetchFile(url) {
  let parsedURL = URL.parse(url, true);
  console.log(parsedURL);
  // let pathname = parsedURL.pathname;
  // pathname = pathname.replace(/^\/+|\/+$/g, "");

  const stream = ytdl(url, { filter: "audioonly" });
  let filepath = path.join(
    __dirname,
    `../audio_files/${parsedURL.query.v}.mp3`
  );
  const output = fs.createWriteStream(filepath);

  stream
    .pipe(output)
    .on("finish", () => {
      console.log(
        chalk.green(
          `The download is complete!\n\nThe audio file can be found at: \n\n${filepath}`
        )
      );
    })
    .on("error", (err) => {
      console.error(chalk.red(`ERROR: ${err.message}`));
    });
}

module.exports = { FetchFile };
