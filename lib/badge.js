const badge = require('gh-badges')

module.exports = function (opts) {
  opts = Object.assign({
    text: [],
    colorA: '#4a90e2',
    colorB: '#0f1121',
    template: 'plastic',
  }, opts)
  opts.text[1] = ' ' + opts.text[1] + ' '
  return new Promise((resolve, reject) => {
    badge(opts, (svg) => {
      resolve(svg)
    })
  })
}
