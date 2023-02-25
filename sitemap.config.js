/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://blog.imasanari.dev',
  outDir: 'out',
  generateRobotsTxt: true,
  changefreq: undefined,
  autoLastmod: false,
  exclude: [
    '*/p1',
  ],
  transform: (config, path) => ({
    loc: path,
    changefreq: config.changefreq,
    priority: path === '/' || path.includes('/posts/') ? config.priority : 0.5,
    lastmod: config.autoLastmod,
    alternateRefs: config.alternateRefs ?? [],
  }),
}
