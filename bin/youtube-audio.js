#!/usr/bin/env node

const program = require("commander");
const pkg = require("../package.json");

program
  .version(pkg.version)
  .command("path", "Manage Youtube file path")
  .parse(process.argv);
// console.log(`Hello from youtube-audio!`);
// console.log(process.argv);
