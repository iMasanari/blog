// @ts-check

import { readFileSync } from 'fs'
import { app, h } from 'hyperapp'
import { withRender } from '@hyperapp/render'
import { load } from 'cheerio'
import { minify } from 'html-minifier'
import critical from 'critical'
import App from '../src/App'
import MetaData from '../src/MetaData'

const template = readFileSync('./dist/index.html', 'utf-8')
const sitemap = JSON.parse(readFileSync('./build-cache/sitemap.json', 'utf-8'))

const render = withRender(app)

const main = async () => {
  for (const path of Object.keys(sitemap)) {
    const { data, meta } = sitemap[path]

    const state = { data }
    const markup = render(state, {}, () => h(App)).toString()
    const metaData = render(state, {}, () => h(MetaData, { path, meta })).toString()
    const initData = `<script>\nvar __data = ${JSON.stringify(state.data, null, 2)};\n</script>`

    const $ = load(template)

    $('head').append(metaData)
    const $app = $('#app')
    $app.html(markup)
    $app.after(initData)

    const html = minify($.html(), {
      decodeEntities: true,
      minifyCSS: true,
      minifyJS: true,
      removeAttributeQuotes: true,
      sortAttributes: true,
      sortClassName: true,
    })

    // 並行して行うとスタックオーバーフローしたのでawaitで1つずつ処理
    await critical.generate({
      inline: true,
      base: 'dist/',
      html: html,
      folder: `.${path}/`,
      dest: `.${path}/index.html`,
    }, undefined)
  }
}

main()
