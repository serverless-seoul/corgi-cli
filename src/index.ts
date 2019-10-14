#!/usr/bin/env node

import program = require("commander");

import { build } from "./build";

program
  .command("build <entitiesFolder>")
  .action((entitiesFolder: string) => {
    build(entitiesFolder);
  });

import { runLocal } from "./run-local";

program
  .command("run-local <apiHandlerPath>")
  .action((apiHandlerPath: string) => {
    const fullPath = `${process.cwd()}/${apiHandlerPath}`;
    const apiPackage = require(fullPath);
    if (!apiPackage.handler) {
      throw new Error(`${fullPath} should have export.handler`);
    }
    runLocal(apiPackage.handler);
  });

program.parse(process.argv);
