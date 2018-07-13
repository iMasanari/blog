---
title: 【ES.next】Objectから任意のキーを削除した新しいObjectを作成する
description: ブログを作る前、Qiitaに投稿しようと書いていたけど途中でやめ、最近まで忘れていた記事です。Qiitaでもいいけど、せっかくだからこっちに置いておきます。
slug: remove-object-key
tags: [JavaScript, Babel, TypeScript]
date: 2018-07-13T12:47:36.148Z
---

## はじめに

ブログを作る前、Qiitaに投稿しようと書いていたけど途中でやめ、最近まで忘れていた記事です。Qiitaでもいいけど、せっかくだからこっちに置いておきます。

## 削除したいキーが最初から決まっている場合

例えばfooキーを削除した新しいオブジェクトを作成する場合、Rest Propertiesを使用し次のように書くことができます。

```js
const removeFoo = (obj) => {
  const { foo, ...res } = obj

  return res
}

removeFoo({ foo: '', bar: 0 }) // { bar: 0 }
```

`foo`は削除される値というのをわかりやすくするために、
`const { foo: _removed, ...res } = obj`
と、`_removed`などに変数名を変更してもいいかもしれません。


## 削除したいキーが最初から決まっていない場合

では、引数などから与えられたキーを削除するにはどうすればいいのでしょうか。


```js
const removeKey = (obj, key) => {
  const res = { ...obj }
  delete res[key]

  return res
}
```

と書くのは少し抵抗がありますよね。

いろいろ試していると、次の方法で任意のキーを取り除くことができました。

```js
const removeKey = (obj, key) => {
  const { [key]: _removed, ...res } = obj

  return res
}

removeKey({ foo: '', bar: 0 }, 'bar') // { foo: '' }
```

ポイントは、`{ [key]: _removed }`の部分です。
`{ [key], ...res }`としただけでは構文エラーとなります。
おそらく、この書き方だと取り出す`key`の名前が不明なためかと思います。


## まとめ

Reduxなどでオブジェクトをimmutableに扱う機会は多いと思います。immutableなHashMapでキーを取り除きたいと思ったときはぜひ使ってみてください！

この方法は、BabelおよびTypeScriptで動作確認を行いました。この2つが対応しているということはおそらく仕様にあるということだと思いますが、一度ecma262の仕様から探してみたいですね。
