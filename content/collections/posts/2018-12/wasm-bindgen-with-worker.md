---
title: Rust + wasm-bindgen + WebWorkerの環境構築
description: WebAssembly Advent Calendar 2018の20日目の記事。
slug: wasm-bindgen-with-worker
tags: [Rust, wasm-bindgen, TypeScript]
date: 2018-12-20T14:58:37.388Z
---

[WebAssembly Advent Calendar 2018][advent-calendar-wasm]の20日目の記事。

## TL;DR

parcelのparcel-plugin-wasm.rsプラグインを使用しよう！

サンプルリポジトリはこちら
[iMasanari/wasm-bindgen-with-worker][wasm-bindgen-with-worker]


## やりたいこと

時間のかかる処理をWebAssemblyで高速に行いたい。そのためには、下記の条件が必要になる。

- 引数や戻り値をJSON形式でやりとりできること
- 非同期処理であること

今回は、Rust(wasm-bindgen)をWebWorkerで動かす環境を作っていく。


## 1度、WebPackで構築するも……

まずは、[WebAssemblyを使って乱数調整ツールをWebに移植した話](https://www.mizdra.net/entry/2018/10/17/080000)を元に、WebPackで構築した。しかし、3つの気になる点が出てきた。

- Worker用のエントリーファイルをもう1つ用意しなければならない
  - [Cannot import wasm in web workers #7647][webpack/issues]
- 中間ファイル生成（Rust→wasm）のせいで、ビルドタスクが煩雑になる

エントリーファイルの件は増えることより、1つだけハッシュのないファイルが存在することに違和感を持った。
普段はRollup.jsでのビルドのため、ハッシュをつけることは基本ないが……


## parcelでの環境構築

parcelで同じ環境を構築したところ、上記の問題を解決することができた。
ライブリロードが安定していない気がするが、ライブリロード使わないRollup.jsユーザーなのでそこまで問題は感じていない。

parcelでWebWorker + WebAssemblyは検索で出てこなかったので、その方法を共有する。

## 各種インストール

Node.jsやRustはインストール済みとする。

parcelのインストール

```bash
$ npm install -D parcel-bundler parcel-plugin-wasm.rs
```

parcel-plugin-wasm.rsはRustをwasm-packでコンパイルするためのparcelのプラグイン。wasm-packのインストールがまだの場合はインストールする。

```bash
$ cargo install wasm-pack
```

個人的にいつもTypeScriptを使うので、それ関連のインストール。
[@types/webassembly-js-api][webassembly-js-api]は、WebAssemblyの型定義。

```bash
$ npm install -D typescript @types/webassembly-js-api
```

## 設定ファイル

srcフォルダの構造と各種設定ファイル（必要最低限の箇所のみ）はこんな感じ。

```bash
$ tree src --dirsfirst
src
├── app
│   └── index.ts
├── wasm
│   ├── lib.rs
│   └── lib.rs.d.ts
├── worker
│   └── index.ts
└── index.html
```

ちなみにこの出力をするためにMacへTreeコマンドを入れた。

```json
// package.json
{
  "scripts": {
    "serve": "parcel src/index.html",
    "build": "parcel build src/index.html --public-url .",
  },
  "devDependencies": {
    "@types/webassembly-js-api": "0.0.2",
    "parcel-bundler": "^1.10.3",
    "parcel-plugin-wasm.rs": "^1.2.6",
    "typescript": "^3.2.2"
  },
  "browserslist": [
    "last 2 chrome versions"
  ]
}
```

```toml
# Cargo.toml
[package]
name = "wasm"
version = "0.1.0"

[dependencies]
wasm-bindgen = "^0.2"

[lib]
crate-type = ["cdylib"]
path = "./src/wasm/lib.rs"
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2015",
    "lib": [
      "es2015",
      "dom",
      "webworker"
    ],
    "strict": true,
    "esModuleInterop": true
  }
}
```

WebAssemblyはIEでは使えないので、TypeScriptのコンパイルはes2015で行っている。parcelのbabel側で変換されないよう、`package.json`では`browserslist`の設定を行う。

## 各ファイル

全部書くのも面倒なので、各ファイルのインポート部分だけ書いていく。
書き足している場所もあるが、全体はサンプルリポジトリを参照。
[iMasanari/wasm-bindgen-with-worker][wasm-bindgen-with-worker]

```html
<!-- src/index.html -->
<script src="app/index.ts"></script>
```

```typescript
// src/app/index.ts
const worker = new Worker('../worker/index.ts')
```

```typescript
// src/worker/index.ts
import * as wasm from '../wasm/lib.rs'

// WebAssemblyの実行
wasm.some_function('run')
```

あとは、Rustの関数を作るだけ。
現在のWebAssemblyは数値しかやりとりができないが、wasm-bindgenを使うことで文字列やJSONもやりとりができるようになる。

```rust
extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn some_function(arg: &str) -> JsValue {
    // ...
}
```

ビルドも下記コマンドだけでOK。
初回だけ、Rustのビルドに時間がかかる。

```bash
# デバッグ用ビルド + サーバー
$ npm run dev
```

```bash
# プロダクションビルド
$ npm run build
```


## まとめ

まだ書きたいことはあるが、日付を超えてしまったので一旦ここまで。
後日、追記または別記事という形で公開していきたい。

parcelを使うことで、簡単にWebAssemblyが始められる。

ちなみにRustは、C言語並みの処理スピードを持ちながらモダンな文法と強力なコンパイル時チェックを備えている言語でおすすめ！　所有権、借用、ライフタイム？　学習コストが高い？　知らんな。一緒に[借用チェッカと戦おうぜ！][borrowing] by Rust初心者


[advent-calendar-wasm]: https://qiita.com/advent-calendar/2018/wasm
[issues]: https://github.com/iMasanari/imasanari.github.io/issues
[twitter/iMasanari]: https://twitter.com/iMasanari
[wasm-bindgen-with-worker]: https://github.com/iMasanari/wasm-bindgen-with-worker
[webpack/issues]: https://github.com/webpack/webpack/issues/7647
[webassembly-js-api]: https://www.npmjs.com/package/@types/webassembly-js-api
[borrowing]: https://doc.rust-jp.rs/the-rust-programming-language-ja/1.6/book/references-and-borrowing.html#概論