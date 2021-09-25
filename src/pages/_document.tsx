import createEmotionServer from '@emotion/server/create-instance'
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import AnalyticsAmp from '~/modules/analytics/AnalyticsAmp'
import AnalyticsScript from '~/modules/analytics/AnalyticsScript'
import { createEmotionCache } from '~/styles'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props) => <App emotionCache={cache} {...props} />,
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

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        ...emotionStyleTags,
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
