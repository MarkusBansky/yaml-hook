# Yaml Hook

This is a NPM CLI package which gives you the ability to process a YAML schema file.

This CLI provides two options to process data, one is to display the errors and suggestions in the console,
and the other is to display a JSON object with detailed information about problems with user's schema, this
provides access to this CLI for IDE implementations.

In order to validate YAML files users have two options:
 - create a file with the same name as YAML file, but adding an extension `.hook`
 - providing the first line `schema: (url)` with url to online schema JSON.

