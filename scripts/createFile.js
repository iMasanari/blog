// @ts-check

const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')

module.exports = (url, data) =>
  new Promise(resolve => {
    mkdirp(path.dirname(url), () => {
      fs.writeFile(url, data, 'utf-8', () => {
        resolve()
      })
    })
  })
