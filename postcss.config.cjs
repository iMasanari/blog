const molcssContext = require('./molcss.context.cjs')

module.exports = {
  plugins: [
    require('molcss/postcss-plugin')({
      content: 'src/**/*.{js,jsx,ts,tsx,astro}',
      context: molcssContext,
    }),
    require('autoprefixer'),
  ],
}
