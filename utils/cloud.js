
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3')
const { IamAuthenticator } = require('ibm-watson/auth')

class TranslatorInCloud {
  constructor (opts) {
    this.opts = opts
    this.languageTranslator = new LanguageTranslatorV3({
      version: '2018-05-01',
      authenticator: new IamAuthenticator({
        apikey: opts.apiKey
      }),
      serviceUrl: opts.apiUrl
    })
  }

  async translate (text) {
    if (!text) {
      return
    }
    const translateParams = {
      text,
      target: this.opts.to
    }

    if (this.opts.from) {
      translateParams.source = this.opts.from
    }
    try {
      const { result } = await this.languageTranslator.translate(translateParams)
      return result.translations[0].translation
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  }
}

module.exports = TranslatorInCloud
