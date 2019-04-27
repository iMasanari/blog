---
title: ブログ開発をParcelに変更した
description: 前回の記事でparcelを使用して便利だったので、このブログのモジュールバンドラをparcelに変更した。決め手は、Tree Shakingがサポートされていたから。
slug: use-parcel
tags: [parcel, blog]
date: 2019-04-26T13:55:56.097Z
---

[前回の記事][wasm-bindgen-with-worker]でparcelを使用して便利だったので、このブログのモジュールバンドラをparcelに変更した。

理由は以下の2つ。

- フラットなコンパイルが（実験的に）サポートされていたから
- ビルドスクリプトの見直し（分割化）


## フラットなコンパイル

Tree Shakingがサポートされていたため。`--experimental-scope-hoisting`で有効にできる。
しかも普段使っているrollup.jsと同じ、フラットなコンパイルである。

というのも、今までのバンドルでは各ファイルのスコープを保つため、それぞれのファイルを`function`で囲っていた。

```js
// フラットでないバンドル結果のイメージ
(function(){
  // boostrap code
  // ...
})({
  'module.js': function (export, require) {
    const add = (a, b) => a + b

    export.add = add
  },
  'main.js': function (export, require) {
    const add = require('module.js').add

    const result = add(1, 2)
    console.log(result)
  }
});
```

それが、こうなる。

```js
// フラットなバンドル結果のイメージ
(function() {
  // module.js
  const add = (a, b) => a + b
  // main.js
  const result = add(1, 2)
  console.log(result)
})();
```

各ファイルのfunctionスコープがなくなり、バンドル結果がコンパクトになっているのがわかる。もしトップレベルの変数名が他ファイルの変数と被っても自動でリネームしてくれる。
ただ、オプション名の「experimental」からわかるように実験的なサポートのため、特殊なことを行おうとするとうまくビルドされない可能性がある。前回の記事の[WebAssembly][wasm-bindgen-with-worker]ではできなかった。


## ビルドスクリプトの見直し（分割化）

変更前では、ビルドスクリプトが1本だったので記事をプレビューする場合でもプログラム全体をコンパイルする必要があった。

現在は、記事のビルド（ts-node）とプログラムのビルド（parcel）を分離して記事単独でビルドできるようにした。また、watchビルドに対応し、コマンドを叩く必要がなくなった。


## 今後

rollup.jsでは非対応だったDynamic Importで記事fetchをしてみたい。そうすると、React Suspence使ってみたいからReactに書き換えるかもしれない。


[wasm-bindgen-with-worker]: /blog/wasm-bindgen-with-worker/
