// @ts-check

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import babel from '@rollup/plugin-babel'
import { defineConfig } from 'astro/config'
import { remarkCodeWrapper } from './scripts/remark-plugin'

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.imasanari.dev',
  integrations: [
    mdx({
      remarkPlugins: [remarkCodeWrapper],
      shikiConfig: {
        theme: 'github-light',
      },
    }),
    tailwind(),
    sitemap(),
  ],
  vite: {
    plugins: [
      /** @type {any} */(
        babel({
          extensions: ['astro', 'ts', 'tsx'],
          plugins: ['tw-tag/babel-plugin'],
          babelHelpers: 'bundled',
        })
      ),
    ],
  },
  compressHTML: true,
})
