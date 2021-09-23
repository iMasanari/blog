import { ServerStyleSheets } from '@material-ui/core'
import CreanCss from 'clean-css'
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import AnalyticsAmp from '~/modules/analytics/AnalyticsAmp'
import AnalyticsScript from '~/modules/analytics/AnalyticsScript'
import { getGenerateClassName } from '~/styles'

const creanCss = new CreanCss()

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const serverGenerateClassName = getGenerateClassName()
    const sheets = new ServerStyleSheets({ serverGenerateClassName })
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)
    const css = creanCss.minify(sheets.toString()).styles

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        (
          <style id="jss-server-side" key="jss-server-side" dangerouslySetInnerHTML={{ __html: css }} />
        ),
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
