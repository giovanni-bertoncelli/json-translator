const fs = require('fs')
const p = require('path')
const TranslatorInCloud = require('./utils/cloud')
const { forInNested, setNested, countLeaves } = require('./utils/trees')

class JsonTranslator {
  constructor (opts) {
    this.opts = opts
  }

  async run () {
    let { input, output } = this.opts
    input = p.isAbsolute(input) ? input : p.join(process.cwd(), input)
    output = p.isAbsolute(output) ? output : p.join(process.cwd(), output)
    const outputJson = JSON.parse(fs.readFileSync(input, 'utf-8'))
    const translator = new TranslatorInCloud(this.opts)

    if (this.opts.spinner) {
      this.opts.spinner.succeed('Initialized!')
    }
    const totalTranslations = await countLeaves(outputJson)
    let current = 0
    await forInNested(outputJson, async (value, key, treePath) => {
      current++
      if (this.opts.spinner) {
        this.opts.spinner.start()
        this.opts.spinner.text = `Translating value #${current}/${totalTranslations}...`
      }

      const translated = await translator.translate(value, this.opts)
      setNested(outputJson, translated, treePath)
    })
    this.opts.text = 'Writing final output...'
    fs.writeFileSync(output, JSON.stringify(outputJson, null, 2))
  }
}

module.exports = JsonTranslator
