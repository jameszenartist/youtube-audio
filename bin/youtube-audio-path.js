const program = require("commander");
const path = require("../commands/path");

program.command("set").description("Set Youtube link").action(path.set);

// program
//   .command("show")
//   .description("Show Youtube link")
//   .action(console.log(`this is the show command`));

// program
//   .command("remove")
//   .description("Remove Youtube link")
//   .action(path.remove);

program.parse(process.argv);
if (!process.argv[2]) {
  program.outputHelp();
}
