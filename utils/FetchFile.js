import chalk from "chalk";
import ytdl from "ytdl-core";
import fs from "fs";
import URL from "url";

function FetchFile(url, filename) {
  let parsedURL = URL.parse(url, true);
  // console.log(parsedURL);

  // console.log(
  //   `${process.cwd()}/audio_files/${
  //     filename.length <= 2 ? parsedURL.query.v : filename
  //   }.mp3`
  // );
  const stream = ytdl(url, { filter: "audioonly" });
  let filepath = `${process.cwd()}/audio_files/${
    filename.length <= 2 ? parsedURL.query.v : filename
  }.mp3`;
  const output = fs.createWriteStream(filepath);

  stream
    .pipe(output)
    .on("finish", () => {
      console.log(
        chalk.green(
          `The download is complete!\n\nThe audio file can be found at: \n\n${filepath} \n\n`
        )
      );
    })
    .on("error", (err) => {
      console.error(chalk.red(`ERROR: ${err.message}`));
    });
}

export default FetchFile;
