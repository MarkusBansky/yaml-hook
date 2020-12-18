#!/usr/bin/env node

import readline = require('readline');

// Require package json
import ApplicationArgumentTypes from './types/applicationArgumentTypes';
import SchemaProcessor from './services/schemaProcessor';

// tslint:disable-next-line:no-var-requires
const packageJson = require('./package.json');

// Display greeting message header
console.log(`You are running YAML-HOOK package`);
console.log(`version ${packageJson.version} by ${packageJson.author}`);
console.log();

// TODO: Check for new version on NPM and display a warning if it is available

// Pass arguments
// Available arguments:
// --help Display usage instructions
// --input {file_path} Input file for processing
const appArgs: string[] = process.argv.slice(2);
if (appArgs.length === 0) {
  throw new Error('Application cannot be run without arguments');
}

// parse them into object
const argsObject: ApplicationArgumentTypes = {};
const boolParameters: { [key: string]: boolean } = { help: true };

// parse command line arguments
for (let i = 0; i < appArgs.length; ) {
  let cmd: string = appArgs[i];
  if (!cmd.startsWith('-')) {
    throw new Error("Argument must start with '-', boolean arguments can be set with '--'");
  }

  if (cmd.startsWith('--')) {
    cmd = cmd.replace('--', '');
    let part: string | boolean | undefined;

    if (i === appArgs.length - 1 || appArgs[i + 1].startsWith('-')) {
      if (boolParameters[cmd]) {
        part = true;
      } else {
        throw new Error('Parameter requires value');
      }
    } else {
      part = appArgs[i + 1];
      i++;
    }

    i++;
    (argsObject as any)[cmd] = part;
  }
}

// perform actions
// first if help is set then display help info
if (argsObject.help) {
  console.log('\n HELP IS NOT YET PROVIDED \n');
} else if (argsObject.input) {
  const yamlPath = argsObject.input;
  let schemaPath = argsObject.schema;

  // try to find the schema from the yaml file
  if (!schemaPath) {
    const lineReader = readline.createInterface({
      input: require('fs').createReadStream(yamlPath),
    });

    lineReader.on('line', (line: string) => {
      if (line.startsWith('yamlSchema:')) {
        schemaPath = line.replace('yamlSchema:', '').trim();
      }
    });

    // if it could not be found then throw an error
    if (!schemaPath) {
      throw new Error('Cannot find a valid schema definition');
    }
  }

  // now as we have the yaml and the schema we can process it
  const processor = new SchemaProcessor(schemaPath, yamlPath);
  processor.process();
} else {
  throw new Error('Application requires at least an input file to work');
}
