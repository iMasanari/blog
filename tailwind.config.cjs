const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      boxShadow: {
        neumo: '2px 2px 4px #bebebe,-2px -2px 4px #fff,inset 0 0 0 #bebebe,inset 0 0 0 #fff',
        'neumo-inset' : '0 0 0 #bebebe,0 0 0 #fff,inset 2px 2px 4px #bebebe,inset -2px -2px 4px #fff',
      },
    },
  },
  plugins: [],
}
