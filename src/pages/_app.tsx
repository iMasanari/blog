import { CacheProvider, EmotionCache } from '@emotion/react'
import { createTheme, CssBaseline, Theme, ThemeProvider } from '@mui/material'
import StylesProvider from '@mui/styles/StylesProvider'
import { AppProps } from 'next/app'
import React from 'react'
import Footer from '~/components/organisms/Footer'
import Header from '~/components/organisms/Header'
import { SITE_NAME } from '~/constants'
import { useAnalytics } from '~/modules/analytics'
import { createEmotionCache, getGenerateClassName } from '~/styles'

const clientSideEmotionCache = createEmotionCache()
const generateClassName = getGenerateClassName()

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {
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
    <StylesProvider generateClassName={generateClassName}>
      <CacheProvider value={emotionCache || clientSideEmotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header title={SITE_NAME} description="技術ブログ改め、Qiitaの下書き" />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </CacheProvider>
    </StylesProvider>
  )
}
