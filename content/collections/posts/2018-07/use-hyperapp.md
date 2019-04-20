---
title: ブログをHyperappベースの自作ジェネレータに変更した話
description: 作ったばかりのこのブログだが、Hyperappで動くstaticでSPAなサイトに変更した。React Staticを使用していた時とは違って、HTMLの書き出しなどは自分で処理を行っている。まだ未完成な機能もあるが、ビルド後のJavaScriptが約8KBと軽量で気に入っている。
slug: use-hyperapp
tags: [blog, Hyperapp]
image: /images/hyperapp.png
date: 2018-07-12T12:45:07.379Z
---

## はじめに

作ったばかりのこのブログだが、[Hyperapp][hyperapp]ベースのstaticでSPAなサイトに変更した。
[React Static][react-static]を使用していた時とは違って、HTMLの書き出しなどは自分で処理を行っている。まだ未完成な機能もあるが、ビルド後のJavaScriptが約8KBと軽量で気に入っている。


## なぜ変更したのか

- [ブログで使用した技術][use-technology]の通り
  - [Hyperapp][hyperapp]があるじゃんとなったのがきっかけ
- ブログではstateやactionがページ遷移関係でしか使っていないことに気づいた
  - 全て[React Static][react-static]に隠されている
- 車輪の再発明が好き

## 移行について

### View部分

jsxが流用できたのでView部分は楽だった。もともとSFCのみでクラスコンポーネントがほぼない。メインコンテンツである記事はmarkdown管理なので問題なし。

```diff
-import React from 'react'
-import { Link } from 'react-static'
+import { h } from 'hyperapp'
+import { Link } from '@hyperapp/router'

 // 中略

-export default withRouteData(
-  ({ posts }: Props) =>
-    <div className="">
+export default ({ posts }: Props) =>
+  <div class="">

 // 後略
```

コンポーネントで実際に変更したのはこのくらい。

### ビルドスクリプトはなんとかなる

なんとかなった。

`requireWithRollup`関数を作れたのが大きい。

```js
// rollupのpluginを適用してrequireできる
const Template = await requireWithRollup('./src/Template.tsx', rollupConfig)
```

実装は[ここ][requireWithRollup]。rollup.jsが自身の設定ファイルを読み込む方法を参考にした。

設定ファイルやビルド方法は[React Static][react-static]を<s>パクった</s>かなり参考にした。


## ルーティング、およびページ遷移部分

ここが一番苦労している。エントリーポイントのindex.tsxがごちゃごちゃしてしまった。書き直すならここ。


## 未実装部分

ページ遷移周りが適当

- ページプリキャッシュ部分
  - 現在はリンククリック時にjson読み込み
  - prefetchやpreloadで先読み？　それともServise Workerを使う？
  - スクリプトが軽いのでいっそJSで雑に先読みしちゃうのもありかも
    - 【追記】この方法で仮実装
- iPhoneでスワイプして戻るとちらつく
  - 前画面のデータをキャッシュしててもダメ
  - [React Static][react-static]の時には起こらなかった


## やるかどうかわからない

ジェネレータ部分を分離


[use-technology]: /blog/use-technology/

[requireWithRollup]: https://github.com/iMasanari/imasanari.github.io/blob/use-hyperapp/scripts/requireWithRollup.js

[react-static]: https://github.com/nozzle/react-static
[react]: https://github.com/facebook/react
[preact]: https://github.com/developit/preact
[hyperapp]: https://github.com/hyperapp/hyperapp
