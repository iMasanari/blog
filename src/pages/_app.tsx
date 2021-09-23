import { createTheme, CssBaseline, StylesProvider, ThemeProvider } from '@material-ui/core'
import { AppProps } from 'next/app'
import React from 'react'
import Footer from '~/components/organisms/Footer'
import Header from '~/components/organisms/Header'
import { SITE_NAME } from '~/constants'
import { useAnalytics } from '~/modules/analytics'
import { getGenerateClassName } from '~/styles'

const generateClassName = getGenerateClassName()

const theme = createTheme({
})

export default function App({ Component, pageProps }: AppProps) {
  useAnalytics()

  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header title={SITE_NAME} description="技術ブログ改め、Qiitaの下書き" />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </StylesProvider>
  )
}
