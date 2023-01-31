// @ts-check

import { readFile, writeFile } from 'fs/promises'
import glob from 'glob'
import { JSDOM } from 'jsdom'

const paths = glob.sync('out/**/*.html')

for (const path of paths) {
  const html = await readFile(path, 'utf-8')
  const jsdom = new JSDOM(html)

  const amphtml = /** @type {HTMLAnchorElement | null} */(
    jsdom.window.document.querySelector('link[rel="amphtml"]')
  )

  if (amphtml && !amphtml.href.endsWith('/')) {
    amphtml.href = amphtml.href + '/'
    const result = jsdom.serialize()

    await writeFile(path, result)
  }
}
