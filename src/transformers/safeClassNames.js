const {get} = require('lodash')
const posthtml = require('posthtml')
const safeClassNames = require('posthtml-safe-class-names')

module.exports = async (html, config = {}, direct = false) => {
  const option = get(config, 'safeClassNames')

  if (option === false) {
    return html
  }

  /*
   * Setting it to `true` in the config will run `safeClassNames`
   * no matter the environment.
   */
  if (config.env === 'local' && !option) {
    return html
  }

  const posthtmlOptions = get(config, 'build.posthtml.options', {})
  const replacements = direct ? config : get(config, 'safeClassNames', {})

  return posthtml([safeClassNames({replacements})]).process(html, posthtmlOptions).then(result => result.html)
}
