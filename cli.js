#!/usr/bin/env node
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
  .boolean('ignoreExistingFile')
  .default('ignoreExistingFile', false)
  .describe('ignoreExistingFile', 'Ignore values already translate in destination file (if exists)')
  .demandOption(['input', 'to', 'apiKey', 'apiUrl'])

const Translator = require('.')
const ora = require('ora')

async function main () {
  const spinner = ora('Initializing... 📚').start()
  const translator = new Translator({ ...argv, spinner })
  await translator.run()
  spinner.succeed('All done! 😆')
  spinner.stop()
}

main()
