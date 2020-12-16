import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
// @ts-expect-error
import withGA from 'next-ga'
import { AppProps } from 'next/app'
import Router from 'next/router'
import React from 'react'
import css from 'styled-jsx/css'
import { Footer } from '~/components/organisms/Footer'
import { Header } from '~/components/organisms/Header'
import { GA_TRACKING_ID, SITE_NAME } from '~/constants'

const theme = createMuiTheme({
})

const App = ({ Component, pageProps }: AppProps) =>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Header title={SITE_NAME} description="技術ブログ改め、Qiitaの下書き" />
    <Component {...pageProps} />
    <Footer />
    <style jsx global>{globalStyles}</style>
  </ThemeProvider>

export default withGA(GA_TRACKING_ID, Router)(App)

const globalStyles = css.global`
@import 'prismjs/themes/prism-okaidia.css';

main {
  display: block;
}

header + main {
  padding-top: 0;
}

header:last-child {
  padding-bottom: 0;
}

pre {
  overflow: auto;
  max-width: none;
  padding: 0.5rem 2rem;
	background: #272822;
}

pre code,
pre samp {
  display: inline;
  padding: 0;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  background: transparent;
}

@media (prefers-color-scheme: dark) {
  :root {
      --color: #0097fc;
      --color-accent: #0097fc4f;
      --color-bg: #333;
      --color-bg-secondary: #555;
      --color-secondary: #e20de9;
      --color-secondary-accent: #e20de94f;
      --color-shadow: #bbbbbb20;
      --color-text: #f7f7f7;
      --color-text-secondary: #aaa;
  }
}
`
