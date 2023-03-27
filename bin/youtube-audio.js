#!/usr/bin/env node

import { program } from "commander";
import pkg from "../package.json" assert { type: "json" };
import path from "../commands/path.js";

program.version(pkg.version).action(path.set).parse(process.argv);

// program
//   .command("show")
//   .description("Show Youtube link")
//   .action(console.log(`this is the show command`));

// program
//   .command("remove")
//   .description("Remove Youtube link")
//   .action(path.remove);

// console.log(`Hello from youtube-audio!`);
// console.log(process.argv);
