---
title: 【書き途中】ブログをHyperappベースの自作ジェネレータに変更した話
description: Hyperappという軽量なVDOMライブラリでブログを書き換えたので試験運用します。
slug: use-hyperapp
tags: [blog, Hyperapp]
date: 2018-07-12T12:45:07.379Z
---

## はじめに

作ったばかりのこのブログだが、[Hyperapp][hyperapp]で動くstaticでSPAなサイトに変更した。
[React Static](react-static)を使用していた時とは違って、HTMLの書き出しなどは自分で処理を行っている。まだ未完成な機能もあるが、ビルド後のJavaScriptが約8KBと軽量で気に入っている。


## なぜ変更したのか

- [ブログで使用した技術][use-technology]の通り
  - [Hyperapp][hyperapp]があるじゃんとなったのがきっかけ
- ブログではstateやactionがページ遷移関係でしか使っていないことに気づいた
  - 全て[React Static](react-static)に隠されている
- 車輪の再発明が好き

## 移行について

- jsxが流用できた
  - もともとSFCのみでクラスコンポーネントがほぼなかった
  - メインコンテンツである記事はmarkdown管理
- 変換スクリプトはなんとかなる
  - なんとかなった


## TODO

後で書く


[use-technology]: /blog/use-technology

[react-static]: https://github.com/nozzle/react-static
[react]: https://github.com/facebook/react
[preact]: https://github.com/developit/preact
[hyperapp]: https://github.com/hyperapp/hyperapp
