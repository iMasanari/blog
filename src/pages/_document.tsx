import createEmotionServer from '@emotion/server/create-instance'
import ServerStyleSheets from '@mui/styles/ServerStyleSheets'
import CreanCss from 'clean-css'
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import AnalyticsAmp from '~/modules/analytics/AnalyticsAmp'
import AnalyticsScript from '~/modules/analytics/AnalyticsScript'
import { createEmotionCache, getGenerateClassName } from '~/styles'

const creanCss = new CreanCss()

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    const serverGenerateClassName = getGenerateClassName()
    const sheets = new ServerStyleSheets({ serverGenerateClassName })

    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props) => sheets.collect(<App emotionCache={cache} {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)

    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ))

    const css = creanCss.minify(sheets.toString()).styles

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        ...emotionStyleTags,
        <style id="jss-server-side" key="jss-server-side" dangerouslySetInnerHTML={{ __html: css }} />,
      ],
    }
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta charSet="utf-8" />
          <AnalyticsScript />
        </Head>
        <body>
          <AnalyticsAmp />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
