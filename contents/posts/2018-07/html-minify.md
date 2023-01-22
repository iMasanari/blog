---
title: 自作ブログのHTMLをminifyした
description: HTMLはホワイトスペースの問題があり、minifyする、しないの意見が別れるようだ。私は普段、HTMLまでは行わないのだが、今回はhtml-minifierを使用してHTMLを圧縮したのでそのメモを残しておく。
slug: html-minify
tags: [html-minifier]
image: /images/html-minify.png
date: 2018-07-29T14:19:54.882Z
---

## はじめに

HTMLはホワイトスペースの問題があり、minifyする、しないの意見が別れるようだ。私は普段、HTMLまでは行わないのだが、今回は[html-minifier][html-minifier]を使用してHTMLを圧縮したのでそのメモを残しておく。


## 動機

- markdownの変換するHTMLが気に入らない
  - 改行はあるがインデントはなく、整形が中途半端
  - minifyして綺麗にしよう！
- 軽量化
  - Hyperappにしたので、軽さにはこだわりたい


## 設定

このブログのHTMLは、Hyperappで生成される部分とmarkdownで生成される部分の2つがある。今回はそれぞれ別の設定でminifyを行った。

### Hyperapp / HTML

```js
{
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  sortAttributes: true,
  sortClassName: true,
}
```

この設定は、Hyperappが事前レンダリングで生成したHTMLに対して行うものである。Virtual DOMから生成されるHTMLには不必要な空白はなく、また実際のDOMとズレているとエラーになりうるので破壊的な変更は行っていない。なので、プロダクションビルド時にのみ行っている。

`minifyJS`は埋め込まれたHyperappの初期state用の設定だ。JSON形式で埋め込まれるため、その余分なクォートを取り除いている。

```diff
-var __data = {"foo": "bar"}
+var __data = {foo: "bar"}
```


### markdown / JSON

```js
{
  collapseBooleanAttributes: true,
  // collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  quoteCharacter: `'`,
  removeAttributeQuotes: true,
  removeRedundantAttributes: true,
  sortAttributes: true,
  sortClassName: true,
}
```

markdownは、ホワイトスペースの削除など破壊的になりうる設定を取り入れている。これは、Hyperappの`innerHTML`で入れているためVirtual DOMの管理外であるからだ。こちらは、破壊箇所がないか様子を見るためにプロダクションビルドでない時にもminifyを行っている。（そのうちプロダクションビルド時のみにしたい）

最初は、細かい作り込みができないmarkdownでは`collapseInlineTagWhitespace`の影響を受けることはないだろうと有効にしていた。しかし、`**foo** **bar**`と書いた時に間のスペースが消えることに気づき、またその設定で効果が出るHTMLをmarkdownが生成するとは思えないのでオフにした。

また、このHTMLはJSONの中にも埋め込まれることから、シングルクォート使用するよう設定した。


## 採用を断念した設定

markdownで`removeOptionalTags`というオプションを使用したかったのだが今回の用法では見送った。これは、省略可能なタグを削除するもので、`p`や`li`の終了タグがその対象の1つだ。

今回の用法では、markdown時、Hyperapp時と2重にminifyされる。1回目の時に`removeOptionalTags`を有効にすると、2回目の時にHTMLが正しくパースされなかった。

```html
<p>終了タグは省略
<!-- 終了タグの正しい場所 -->
<pre><code>/* 別のタグ */</code></pre>
<!-- html-minifierが</p>を挿入した場所 -->
<p>別のpタグ
```

2回目の時にもそのオプションが有効なら間違えて挿入した終了タグも削除された。だが、間違えた状態でminifyされるコードを信頼できないため、`removeOptionalTags`は行わないことにした。


## 結果

1つ前の記事[【ES.next】Objectから任意のキーを削除した新しいObjectを作成する][remove-object-key]をminifyした。

| 設定                     | HTML        | JSON       |
| :---------------------- | ----------: | ---------: |
| HTML minifyなし          | 14,170 Byte | 6,275 Byte |
| `removeOptionalTags`なし | 13,872 Byte | 6,088 Byte |
| `removeOptionalTags`あり | 13,722 Byte | 6,037 Byte |

`removeOptionalTags`をありにしても元のHTMLの96.8%程度。インデントなしのHTMLをminifyしてもあまり効果はないようだ。
また、`removeOptionalTags`の有無もあまり差はなかった。箇条書きを多用すればもう少し差が開く可能性はあるが、わざわざ有効にするほどでもなさそう。

<!-- link -->
[html-minifier]: https://github.com/kangax/html-minifier
[remove-object-key]: /posts/remove-object-key/
