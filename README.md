# json-translator

Translate your JSON file with this tool!

This tool requires [IBM Cloud Language Translator](https://cloud.ibm.com/apidocs/language-translator?code=try#introduction) subscription in order to translate automatically your keys. It's free and very easy to use!

- [Installation](#installation)
- [Get started](#get-started)
- [API](#api)
- [More customization](#more-customization)

## Installation

Since this package is not on the ufficial NPM registry you should add the github npm registry for my account prefix: create a .npmrc file inside your destination project (or the global npmrc, run "npm config list") and insert this line

```text
@giovanni-bertoncelli:registry=https://npm.pkg.github.com
```

and then install the package:

```bash
npm install [-g] @giovanni-bertoncelli/json-translator
```

## Get started

In order to translate a JSON language file:

- Put your JSON file in your working directory
- Retrieve a [IBM Cloud Language Translator](https://cloud.ibm.com/apidocs/language-translator?code=try#introduction) API URL and key
- Launch the utility, specifying the target language:

```bash
json-translator input.json --to en --apiKey ${apiKey} --apiUrl ${apiUrl}
```

This tool will proceed creating a output file with all your translation keys automatically translated!

## API

You can use this module also as API:

```javascript
const JsonTranslator = require('json-translator');
// same params available for CLI see below
const params = {};
const translator = new JsonTranslator({...params})
await translator.run();
```

## More customization

| Parameter | Required | Type   | Default       | Description                                                                                                                                 |
| --------- | -------- | ------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| input     | X        | path   | ./output.json | The JSON file to translate                                                                                                                  |
| output    |          | path   | ./output.json | The translated JSON output                                                                                                                  |
| to        | X        | string |               | Which language translate the JSON input to. (Available languages: https://cloud.ibm.com/apidocs/language-translator?code=try#listlanguages) |
| from      |          | string |               | Which language is used in the input JSON file (automatically inferred if omitted)                                                           |
| apiUrl    | X        | string |               | IBM Cloud Language Translator API Url (see: https://cloud.ibm.com/apidocs/language-translator?code=try#service-endpoint)                    |
| apiKey    | X        | string |               | IBM Cloud Language Translator API Key                                                                                                       |