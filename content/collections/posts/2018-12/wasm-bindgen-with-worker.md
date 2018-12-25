---
title: Rust + wasm-bindgen + WebWorkerの環境構築
description: WebAssembly Advent Calendar 2018の20日目の記事。
slug: wasm-bindgen-with-worker
tags: [Rust, wasm-bindgen, TypeScript, parcel]
date: 2018-12-20T14:58:37.388Z
---

[WebAssembly Advent Calendar 2018][advent-calendar-wasm]の20日目の記事。
※ 12/25: 修正、追記

## TL;DR

parcelのparcel-plugin-wasm.rsプラグインを使用しよう！

サンプルリポジトリはこちら
[iMasanari/wasm-bindgen-with-worker][wasm-bindgen-with-worker]


## やりたいこと

時間のかかる処理をWebAssemblyで高速に行いたい。そのためには、下記の条件が必要になる。

- 引数や戻り値をJSON形式でやりとりできること
- 非同期処理であること

今回は、Rustでwasm-bindgenを使用し、WebWorker内で動かす環境を作っていく。


## 1度、WebPackで構築するも……

まずは、[WebAssemblyを使って乱数調整ツールをWebに移植した話](https://www.mizdra.net/entry/2018/10/17/080000)を元に、WebPackで構築した。しかし、3つの気になる点が出てきた。

- Worker用のエントリーファイルをもう1つ用意しなければならない
  - [Cannot import wasm in web workers #7647][webpack/issues]
- 中間ファイル生成（Rust→wasm）のせいで、ビルドタスクが煩雑になる
- ライブリロード
  - ワンテンポ遅いタイミングでページ全体のリロードがされる
  - ページ全体リロードの読み込み時間も長い

エントリーファイルの問題は、WebWorkerのファイル名にハッシュ（`worker.2290ab9e.js`の`2290ab9e`部分）が付けられないことである。今回はスクリプトがView、WebWorker、WASMの3ファイルに分かれるので、キャッシュ対策のためにも必要度は高い。


## parcelでの環境構築

Webpackで環境を作って数日後、ふと別のモジュールバンドラを使用すればよいのではと思い、parcelで試してみた。すると、上記のエントリーファイル問題、中間ファイル問題を解決することができた。
ライブリロードの件は一応差分更新を試みてくれるが、Rustの更新内容は反映されなかった。ただ、普段ライブリロードは使わず、またワンテンポ遅れの全リロードでないためそこまで問題は感じていない。

なぜ最初にparcelで試さなかったのかというと、情報がWebpackのものしかなかったからだ。なので今回、parcelでWebWorker + WebAssemblyを扱う方法を共有したい。
（といっても、parcelがゼロコンフィグなモジュールバンドラのため、そこまで凝ったことはしていないが）


## 各種インストール

Node.jsやRustはインストール済みとする。

parcelのインストール

parcel-plugin-wasm.rs v1.2.7はparcel-bundler v1.11.0に対応していないのかビルドエラーになったため、バージョンを指定してインストールしている。

```bash
$ npm install -D parcel-bundler@1.10.x parcel-plugin-wasm.rs
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

## フォルダ構成と設定ファイル

### フォルダ構成（srcフォルダ）
各種フォルダとエントリーポイントのHTMLという構成で、個人的にすごくきれいな配置だと思う。
ちなみにこの出力をするためにMacへTreeコマンドを入れた。

```bash
$ tree src
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


### 各種設定ファイル（必要最低限の箇所のみ）

```json
// package.json
{
  "scripts": {
    "dev": "parcel src/index.html",
    "build": "parcel build src/index.html",
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

```text
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

WebAssembly未対応のIEを切り捨て、TypeScriptのコンパイルはes2015で行っている。parcelのbabel側で変換されないよう、`package.json`では`browserslist`の設定を行う。

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
wasm.some_function('WebAssembly')
```

あとは、Rustの関数を作るだけ。
現在のWebAssemblyは数値しかやりとりができないが、wasm-bindgenを使うことで文字列やJSONもやりとりができるようになる。

```rust
// src/wasm/lib.rs
extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn some_function(input: &str) -> String {
    format!("Hello, {}!", input)
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

出力結果はこんな感じ。
なぜか`lib.rs`まで出力されているが、ちゃんとハッシュが付いているのが確認できる。

```bash
$ tree dist
dist
├── app.68414551.js
├── index.html
├── lib.3d22fd5b.rs
├── wasm_bg.ead9fc9c.wasm
└── worker.135e8d27.js
```


## Webpackとの違い

### RustからのJavaScriptコード呼び出しパス

Webpackでは、pkgフォルダ内のファイルをインポートするため、相対パスの基準は`pkg/`である。
parcel(parcel-plugin-wasm.rs)では、`node_modules/parcel-plugin-wasm.rs/`が基準である。parcelの絶対パス（`/*`）を使えば、エントリーファイルの場所（今回は`src/`）が基準になる。

```rust
// src/wasm/lib.rs
#[wasm_bindgen(module = "/worker/wasm-util")]
extern {
    fn console_log(s: &str);
}
```

### WebWorker側でのRustインポート

Webpackでは、WASMをインポートするまでに必ずDynamic importを挟む必要がある。
parcelではその必要がなく、直接importする。（そもそもWebWroker内でのDynamic importがサポートされていない？）

つまり、parcelではWASMロード中の`postMessage`を取りこぼしてしまう可能性がある。
そのため[サンプル][wasm-bindgen-with-worker]では、[ロードを待ってからメッセージを送る](https://github.com/iMasanari/wasm-bindgen-with-worker/blob/master/src/app/wasmWorker.ts#L24)ようにしている。


## まとめ

parcelを使うことで、簡単にWebAssemblyが始められる。

ちなみにRustは、C言語並みの処理スピードを持ちながらモダンな文法と強力なコンパイル時チェックを備えている言語でおすすめ！　所有権、借用、ライフタイム？　学習コストが高い？　知らんな。一緒に[借用チェッカと戦おうぜ！][borrowing] by Rust初心者


[advent-calendar-wasm]: https://qiita.com/advent-calendar/2018/wasm
[issues]: https://github.com/iMasanari/imasanari.github.io/issues
[twitter/iMasanari]: https://twitter.com/iMasanari
[wasm-bindgen-with-worker]: https://github.com/iMasanari/wasm-bindgen-with-worker
[webpack/issues]: https://github.com/webpack/webpack/issues/7647
[webassembly-js-api]: https://www.npmjs.com/package/@types/webassembly-js-api
[borrowing]: https://doc.rust-jp.rs/the-rust-programming-language-ja/1.6/book/references-and-borrowing.html#概論