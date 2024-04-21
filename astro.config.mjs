// @ts-check

import { createRequire } from 'node:module'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { babel } from '@rollup/plugin-babel'
import { defineConfig } from 'astro/config'
import { remarkCodeWrapper } from './scripts/remark-plugin'

const require = createRequire(import.meta.url)
const molcssContext = require('./molcss.context.cjs')

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.imasanari.dev',
  integrations: [
    mdx({
      remarkRehype: {
        footnoteLabelTagName: 'hr',
        footnoteLabel: ' ',
        footnoteBackLabel: () => /** @type {any}*/(null),
        footnoteLabelProperties: {},
      },
      remarkPlugins: [remarkCodeWrapper],
      shikiConfig: {
        theme: 'github-light',
      },
    }),
    sitemap(),
  ],
  vite: {
    plugins: [
      babel({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.astro'],
        babelHelpers: 'bundled',
        plugins: [
          ['molcss/babel-plugin', {
            context: molcssContext,
          }],
        ],
      }),
    ],
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
  compressHTML: true,
})
