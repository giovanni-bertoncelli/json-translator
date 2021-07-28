const { argv } = require('yargs')
  .usage('$0 <input>', 'Translate input file')
  .positional('input', {
    describe: 'Input JSON file',
    type: 'string',
    alias: 'i'
  })
  .string('output')
  .alias('output', 'o')
  .describe('output', 'Output JSON file')
  .default('output', 'output.json')
  .string('to')
  .alias('to', 't')
  .describe('to', 'Translate to language')
  .string('from')
  .alias('from', 'f')
  .describe('from', 'Translate from language')
  .string('apiKey')
  .describe('apiKey', 'Cloud IBM Language Translator API KEY')
  .string('apiUrl')
  .describe('apiUrl', 'Cloud IBM Language Translator API URL')
  .help()
  .demandOption(['input', 'to', 'apiKey', 'apiUrl'])

const Translator = require('./api')

async function main () {
  const translator = new Translator(argv)
  await translator.run()
}

main()
