// @ts-check

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
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
  compressHTML: true,
})
