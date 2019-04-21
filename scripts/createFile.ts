// @ts-check

import { dirname } from 'path'
import { writeFile } from 'fs'
import mkdirp from 'mkdirp'

export default (url: string, data: string) =>
  new Promise(resolve => {
    mkdirp(dirname(url), () => {
      writeFile(url, data, 'utf-8', () => {
        resolve()
      })
    })
  })
