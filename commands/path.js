const inquirer = require("inquirer");
const { URL } = require("url");
const { validURL } = require("../lib/validURL");
const { FetchFile } = require("../lib/FetchFile");

const chalk = require("chalk");

const path = {
  async set() {
    // await console.log(`hello from set`);

    try {
      const input = await inquirer.prompt([
        {
          type: "input",
          name: "path",
          message: chalk.green("Enter Youtube Link: "),
        },
      ]);
      const path = validURL(input.path);
      if (path) {
        console.log(chalk.blue("Youtube Link set!"));
        FetchFile(input.path);
      } else {
        console.log(chalk.red("Please Enter Valid Youtube Link!"));
      }
    } catch (error) {
      console.error(chalk.red(error.message));
    }
  },
};

module.exports = path;
