import { CacheProvider, EmotionCache } from '@emotion/react'
import { createTheme, CssBaseline, Theme as MuiTheme, ThemeProvider } from '@mui/material'
import { AppProps } from 'next/app'
import React from 'react'
import Footer from '~/components/organisms/Footer'
import Header from '~/components/organisms/Header'
import { SITE_NAME } from '~/constants'
import { useAnalytics } from '~/modules/analytics'
import { createEmotionCache } from '~/styles'

const clientSideEmotionCache = createEmotionCache()

declare module '@emotion/react' {
  interface Theme extends MuiTheme {
  }
}

const theme = createTheme({
})

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({ Component, pageProps, emotionCache }: MyAppProps) {
  useAnalytics()

  return (
    <CacheProvider value={emotionCache || clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header title={SITE_NAME} description="技術ブログ改め、Qiitaの下書き" />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </CacheProvider>
  )
}
