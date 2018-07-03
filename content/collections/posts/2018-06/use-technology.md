---
title: ブログで使用した技術
slug: use-technology
tags: [blog, React, preact, TypeScript, ReactStatic]
date: 2018-06-30T14:52:29.225Z
---

## 使用した技術

このブログに使った技術の選定理由を紹介していきます。


### React (preact)

[React](https://github.com/facebook/react)はFacebook社の作ったViewライブラリ。
[preact](https://github.com/developit/preact)はReactの軽量な互換ライブラリで、今回はこちらを使用しています（が、互換なのでReactと表記していきます）。

ReactはViewだけのシンプルなライブラリで、よく他のライブラリやフレームワークと組み合わせて使われます。なのでReactをベースに作りながら色々なものを試してみようというのをこのブログの目的にしました。

#### その他View系ライブラリ

- [Vue.js](https://github.com/vuejs/vue)
  悪くはないけど、良さを活かせそうでもなかった。今回はReactのSFCで十分そう。
- [Angular](https://github.com/angular/angular)
  重そう。機能過多っぽそう。
- [Hyperapp](https://github.com/hyperapp/hyperapp)
  私がView系ライブラリに求める条件が一通り揃っていて、preactより軽量。気にはなっているが、SPA+staticなサイトを作るジェネレータがなさそうだったので今回は見送りました。いずれ自作して置き換えるかもしれないです。


### TypeScript

[TypeScript](https://github.com/Microsoft/TypeScript)はMicrosoftが開発した言語。
型のないJavaScriptに戻ることができなくなってしまったため採用しました。

ReactのPropsをチェックできるのがかなり助かっています。

類似技術にFlowがありますが、私はそれを「実行前に型エラーを検知するためのツール」だと捉えています。私が型に求めているものは「型付きの言語」であるTypeScriptの方が近いのかなと思っています。
この違いについての記事をそのうち書いていきたいです。


### React Static

[React Static](https://github.com/nozzle/react-static)はSPA+staticなサイトを作るためのジェネレータ。
今回初めて使用します。

候補がもう1つあったけど、とりあえず新しい方試してみるかーとこちらを入れてみました。TypeSctiptやMarkdownのサンプルがあったのでそこをちょこっと弄って使っています。
また、Markdownには[jdown](https://github.com/DanWebb/jdown)を使用しています。


## まとめ

React Staticが加わったものの、React + TypeScriptといういつもの構成です。
そこから色々なライブラリを追加していく…予定ですが、もしかしたらいきなりHyperappに置き換えるかも。でも、今の所は基本的なブログの機能を実装していくのが先ですね。