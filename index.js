const fs = require('fs')
const p = require('path')
const TranslatorInCloud = require('./utils/cloud')
const { forInNested, setNested, countLeaves, getNested } = require('./utils/trees')

class JsonTranslator {
  constructor (opts) {
    this.opts = opts
  }

  async run () {
    let { input, output, ignoreExistingFile } = this.opts

    if (ignoreExistingFile) {
      console.warn('⚠️ ignoreExistingFile param is true: there may be a lot of API calls by ignoring existing translations!')
    }

    input = p.isAbsolute(input) ? input : p.join(process.cwd(), input)
    output = p.isAbsolute(output) ? output : p.join(process.cwd(), output)

    const inputJson = JSON.parse(fs.readFileSync(input, 'utf-8'))
    let outputJson = {}

    if (fs.existsSync(output) && !ignoreExistingFile) {
      outputJson = JSON.parse(fs.readFileSync(output, 'utf-8'))
    }

    const translator = new TranslatorInCloud(this.opts)

    if (this.opts.spinner) {
      this.opts.spinner.succeed('Initialized!')
    }

    const totalTranslations = await countLeaves(inputJson)
    let current = 0
    await forInNested(inputJson, async (value, key, treePath) => {
      current++

      if (this.opts.spinner) {
        this.opts.spinner.start()
        this.opts.spinner.text = `Translating value #${current}/${totalTranslations}...`
      }

      if (getNested(outputJson, treePath) && !ignoreExistingFile) {
        this.opts.spinner.text = 'Translation already in output file, skipping.'
      } else {
        const translated = await translator.translate(value, this.opts)
        setNested(outputJson, translated, treePath)
      }
    })

    this.opts.text = 'Writing final output...'
    fs.writeFileSync(output, JSON.stringify(outputJson, null, 2))
  }
}

module.exports = JsonTranslator
