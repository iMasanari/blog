// @ts-check

import { readFileSync } from 'fs'
import { app, h } from 'hyperapp'
import { withRender } from '@hyperapp/render'
import { load } from 'cheerio'
import { minify } from 'html-minifier'
import critical from 'critical'
import Template from '../src/Template'

const template = readFileSync('./dist/index.html', 'utf-8')
const sitemap = JSON.parse(readFileSync('./build-cache/sitemap.json', 'utf-8'))

const render = withRender(app)
const $ = load(template)

const script = $('#script').attr('src')
const css = $('link[rel=stylesheet]').attr('href')

const main = async () => {
  for (const path of Object.keys(sitemap)) {
    const { data, meta } = sitemap[path]

    const state = { data }
    const props = { path, script, css, meta }
    const contents = render(state, {}, () => h(Template, props))

    const html = minify(`<!DOCTYPE html>${contents.toString()}`, {
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
