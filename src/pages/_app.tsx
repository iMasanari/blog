import { createTheme, CssBaseline, StylesProvider, ThemeProvider } from '@material-ui/core'
// @ts-expect-error
import withGA from 'next-ga'
import { AppProps } from 'next/app'
import Router from 'next/router'
import React from 'react'
import css from 'styled-jsx/css'
import Footer from '~/components/organisms/Footer'
import Header from '~/components/organisms/Header'
import { GA_TRACKING_ID, SITE_NAME } from '~/constants'
import { getGenerateClassName } from '~/styles'

const generateClassName = getGenerateClassName()

const theme = createTheme({
})

export default withGA(GA_TRACKING_ID, Router)(function App({ Component, pageProps }: AppProps) {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header title={SITE_NAME} description="技術ブログ改め、Qiitaの下書き" />
        <Component {...pageProps} />
        <Footer />
        <style jsx global>{globalStyles}</style>
      </ThemeProvider>
    </StylesProvider>
  )
})

const globalStyles = css.global`
`
