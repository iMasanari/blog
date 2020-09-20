---
title: ブログをNext.jsベースに変更した
description: 
slug: use-next
tags: [React, Next.js, blog]
date: 2020-09-20T06:33:49.199Z
---

久しぶりの更新。  
ブログの使用技術をReact+Next.jsに変更した。


## 使用技術

### 変更

- Hyperapp v1 -> React
- 自作フレームワーク？ -> Next.js
- nes.css -> mvp.css

### 続投

- TypeScript

## なぜ変えたか

Next.jsがSSGに対応し、`getStaticPaths`、`getStaticProps`が気になったため。


## なぜ`getStaticPaths`、`getStaticProps`が気になったのか

以下のメリットがあるため。

- ダイナミックルーティングをコンポーネント側で設定できる
- データの加工処理を事前に行ってくれる


## ダイナミックルーティングの設定について

SSGでダイナミックルーティングを行う場合、下記の設定が必要である。

- ダイナミックに生成されるURL
- 上記URLで使用するテンプレートと、それに渡すデータ

たいていのSSGツールの場合、上記は設定ファイルに記述する必要がある。しかし、Next.jsでは、`pages`ディレクトリ内のコンポーネントに記述する。

```js
// 例) pages/blog/[slug].jsx

// ダイナミックに生成されるURLの一覧
export const getStaticPaths = async () => {
  const contents = getAllPosts() // 記事一覧の取得
  const paths = contents.map(v => `/blog/${v.slug}`)

  return { paths, fallback: false }
}

// コンポーネントで使用するデータ
export const getStaticProps = async ({ params }) => {
  const post = getPost(params.slug) // 記事データの取得

  const props = { post }

  return { props }
}

// 使用するコンポーネント
export default ({ post }) => {
  return <div>{/* ... */}</div>
}
```

コンポーネントの1つのファイルにまとまるのは便利。

なお、`getStaticPaths`、`getStaticProps`内では、node.jsで実行（ブラウザのAPI利用不可）されるが、importしたアセットはWebpackのローダーが適用される。
このブログでは、`require.context`ですべてのマークダウンファイルを取得し、`mdx-loader`等でHTML化して読み込んでいる。


## 最後に

Gatby.jsというフレームワークを触ったときに、`page`ディレクトリの自動ルーティングがあるのにダイナミックルーティングの設定は設定ファイルに書かなければいけないことに違和感があった。Next.jsでは、`pages`ディレクトリ内のコンポーネントのファイルで`getStaticPaths`、`getStaticProps`をexportするという方法を採用している。もし、このブログをまた自作フレームワークを採用する場合、ぜひ採用してみたい。
