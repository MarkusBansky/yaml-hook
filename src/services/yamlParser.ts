export interface ParsedYamlSection {
  [key: string]: string | string[] | ParsedYamlSection;
}

function countWhitespace(line: string): number {
  let counter = 0;
  for(const a of line) {
    if (a === " ") {
      counter ++;
    } else {
      break;
    }
  }
  return counter;
}

function getNextLine(i: number, lines: string[]): [number, string | undefined] {
  while(i < lines.length) {
    if (!lines[i].trim().startsWith("#")) {
      return [i, lines[i]];
    }

    i ++;
  }

  return [i, undefined];
}

export default function parseYaml(level: number, lines: string[]): ParsedYamlSection {
  const result: ParsedYamlSection = {};
  let line: string | undefined;
  let lastProp: string = '';
  let i = 0;

  // tslint:disable-next-line:no-conditional-assignment
  while([i, line] = getNextLine(i, lines)) {
    if (!line) break;

    const currentLevel = countWhitespace(line) / 2;

    if (currentLevel === level) {
      // parts
      const indexOfHash = line.indexOf(" #");
      const withoutComment = indexOfHash > 0 ? line.substring(0, indexOfHash) : line;
      const parts = withoutComment.split(":");

      if (parts.length === 0) {
        continue;
      }

      const propName = parts[0].trim();
      const valueName = parts.length > 1 ? parts[1].trim() : undefined;

      lastProp = propName;

      result[propName] = valueName ?? '';
    } else {
      if (lastProp === '') {
        throw new Error("Invalid YAML");
      }

      result[lastProp] = parseYaml(currentLevel, lines.slice(i));
    }
  }

  return result;
}