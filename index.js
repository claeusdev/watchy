#! /usr/bin/env node
const debounce = require("lodash.debounce");
const chokidar = require("chokidar");
const program = require("caporal");
const fs = require("fs");
program
  .version("0.0.1")
  .argument("[filename]", "NAme of file to run")
  .action(async ({ filename }) => {
    const name = filename || "index.js";
    const start = debounce(() => {
      console.log("started");
    }, 100);

    try {
      await fs.promises.access(name);
    } catch (error) {
      throw new Error(`Could not find the file: ${name}`);
    }
    chokidar
      .watch(".")
      .on("add", start)
      .on("change", start)
      .on("unlink", start);
  });

program.parse(process.argv);
