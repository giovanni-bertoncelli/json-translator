const fs = require('fs')
const p = require('path')
const TranslatorInCloud = require('./utils/cloud')
const { translate } = require('./utils/cloud')
const { forInNested, setNested } = require('./utils/trees')

class Translator {
  constructor (opts) {
    this.opts = opts
  }

  async run () {
    let { input, output } = this.opts
    input = p.isAbsolute(input) ? input : p.join(__dirname, input)
    output = p.isAbsolute(output) ? output : p.join(__dirname, output)
    const outputJson = JSON.parse(fs.readFileSync(input, 'utf-8'))
    const translator = new TranslatorInCloud(this.opts)
    await forInNested(outputJson, async (value, key, treePath) => {
      const translated = await translator.translate(value, this.opts)
      setNested(outputJson, translated, treePath)
    })
    fs.writeFileSync(output, JSON.stringify(outputJson, null, 2))
  }
}

module.exports = Translator
