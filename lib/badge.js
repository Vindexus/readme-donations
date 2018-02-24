const badge = require('gh-badges')

module.exports = function (opts) {
  opts = Object.assign({
    text: [],
    colorA: '#1E90FF',
    colorB: '#333',
    template: 'plastic',
  }, opts)
  opts.text[1] = ' ' + opts.text[1] + ' '
  return new Promise((resolve, reject) => {
    badge(opts, (svg) => {
      resolve(svg)
    })
  })
}
