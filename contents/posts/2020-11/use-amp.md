---
title: ブログをAMP対応（仮）しました
description: "実質、各ページに `export const config = { amp: 'hybrid' }` を追加しただけ。next.js超ラク。"
slug: use-amp
tags: [AMP, Next.js, blog]
date: 2020-11-28T08:05:18.607Z
---

実質、各ページコンポーネントに `export const config = { amp: 'hybrid' }` を追加しただけ。  
Next.js超ラク。


## AMPとは

> Accelerated Mobile Pages (AMP) は、Googleが中心となって立ち上げた、モバイルでのウェブサイト閲覧を高速化することを目的とするオープンソースプロジェクトである。また、AMPの成果物である一連の仕様やライブラリなどについてもAMPと呼ぶ。AMPは、従来より用いられているHTMLなどのウェブ技術を改良したもので、中核となるのはAMP HTMLと呼ばれるHTMLの一種である。

らしいです。Wikipadiaより引用。

ページの表示が遅くなる書き方を禁止するため、HTMLの書き方が制限されますが、代わりにAMPが用意したコンポーネントを使用できます。そして、AMPのルールに沿って書くことで、モバイル時にGoogle検索からページに入るときなどにAMP Cacheと呼ばれる専用のCDNから配信されるというメリットがあります。


## やったこと

### AMP設定の追加

上記の通り、下記を追加しました。

```js
export const config = { amp: 'hybrid' }
```

上記の設定を追加することで、`next export` 時に下記のようにファイルが出力されます。

```bash
$ tree out/blog
out/blog
├── deploy-to-github-pages-user-page
│   └── index.html
├── deploy-to-github-pages-user-page.amp
│   └── index.html
├── difference-between-jsx-and-html
│   └── index.html
├── difference-between-jsx-and-html.amp
│   └── index.html
├── environment-construction
│   └── index.html
├── environment-construction.amp
│   └── index.html
...
```

AMP時は `{slug}.amp/index.html` に、非AMP時は `{slug}/index.html` が使用されます。


### グローバルCSSの読み込み方法の変更

グローバルCSSをWebpackの `import` 経由ではなく、styled-jsx + postcss-importで読み込むように変更しました。Webpackの `import` だと、AMP時にうまく読み込まれないようです。

参考： [AMP: styles missing when importing standard css files in a project using styled components #7121](https://github.com/vercel/next.js/issues/7121)

```diff:src/pages/_app.tsx
-import 'mvp.css'
-import 'prismjs/themes/prism-okaidia.css'

 // ...

 <style jsx global>{`
+  @import 'mvp.css';
+  @import 'prismjs/themes/prism-okaidia.css';
   /* ... */
 `}</style>
```

```diff:postcss.config.js
module.exports = {
  plugins: {
    'postcss-custom-properties': {},
+   'postcss-import': {},
  },
}
```


### スタイル調整

各ページのコンポーネントについて、非AMP時は `<div id="__next">...</div>` の中に展開されますが、AMP時は `body` 以下に直接展開されます。

現在このブログで使用しているCSSフレームワークの「mvp.css」に下記のようなスタイルがあったため、AMP時と非AMP時で表示に差異が出ていました。

```css:mvp.css
/* 非AMP時のみ下記が適応されない */
article header, div header, main header {
  padding-top: 0;
}
```

非AMP時でも同じ見た目になるよう、下記を追加しました。

```diff:src/components/organisms/Header.tsx
+<style jsx>{`
+.Header {
+  padding-top: 0;
+}
+`}</style>
```


## やらなかったこと

### AMP Componentsの使用

画像を使っていなかったので、`amp-img` すら使っていないです。だからこそ、楽に対応できたというのもあります。  
AMP時と非AMP時の表示の切り替えなどもありません。


## まとめ
シンプルなので、簡単にできました、という感じです。  
画像はそのうち対応したいです。
