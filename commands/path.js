import inquirer from "inquirer";
import chalk from "chalk";
import validURL from "../utils/validURL.js";
import FetchFile from "../utils/FetchFile.js";

const path = {
  async set() {
    try {
      const input = await inquirer.prompt([
        {
          type: "input",
          name: "path",
          message: chalk.green("Enter Youtube Link: \n"),
        },
      ]);
      const path = input.path && validURL(input.path);
      if (path) {
        console.log(chalk.blue("Youtube Link set!\n\n"));
        const fileName = await inquirer.prompt([
          {
            type: "fileName",
            name: "downloadName",
            message: chalk.green("What would you like to name the file?: \n"),
          },
        ]);
        if (fileName.downloadName.length > 2) {
          let str = fileName.downloadName.replaceAll(" ", "_");
          console.log(chalk.green(`The name you've chosen is: ${str}\n`));
          FetchFile(input.path, str);
        } else {
          console.log(
            chalk.green(
              `The chosen name was too short, so a default has been set!\n`
            )
          );
          FetchFile(input.path, fileName.downloadName);
        }
      } else {
        throw new Error("Please Enter Valid Youtube Link!\n");
      }
    } catch (error) {
      console.error(chalk.red(error.message));
    }
  },
};

export default path;
