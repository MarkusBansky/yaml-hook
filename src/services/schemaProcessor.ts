import Schema from '../types/schemaTypes';
import parseYaml, { ParsedYamlSection } from "./yamlParser";

import readline = require('readline');

export default class SchemaProcessor {
  private readonly _schemaPath: string;
  private readonly _yamlPath: string;

  constructor(schemaPath: string, yamlPath: string) {
    this._schemaPath = schemaPath;
    this._yamlPath = yamlPath;
  }

  process() {
    const yamlLines: string[] = [];
    const lineReader = readline.createInterface({
      input: require('fs').createReadStream('file.in')
    });
    lineReader.on('line', (line: string) => {
      yamlLines.push(line);
    });

    const schema: Schema = require(this._schemaPath);
    const yaml: ParsedYamlSection = parseYaml(0, yamlLines);

    console.log(yaml);

    return;
  }
}
