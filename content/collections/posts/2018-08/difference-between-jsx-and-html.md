---
title: HTMLでは使えないJSX独自の書き方
description: HTMLとReact JSXの書き方の違いでハマったポイントをまとめた。
slug: difference-between-jsx-and-html
tags: [React]
date: 2018-08-13T14:57:58.277Z
---

## はじめに

業務でHTML（Javaのjsp）を書いている時、select要素の初期値をReactのJSXの感覚で書いたら動かなかった。HTMLとJSXとでは書き方が違ったのだ。

## select要素

ReactのJSXでは、select要素のvalue属性にその値を入れることでの初期値を決めることができる。

```jsx
const Component = () =>
  <select value="bar">
    <option value="foo">FOO</option>
    <option value="bar">BAR</option>
  </select>
```

一方HTMLでは、初期値にするoption要素へselected属性を指定する必要がある。

```html
<select>
  <option value="foo">FOO</option>
  <option value="bar" selected>BAR</option>
</select>
```

## 閉じタグ

JSXでは閉じタグは省略できないが、HTMLでは、省略できる要素がある。

```html
<ul>
  <!-- JSXでは文法エラー -->
  <li><p>foo
  <li><p>bar
<ul>
```

一方で空要素は、JSXでは全てのタグで`<div />`と終了タグを省略できるが、HTMLでは`<img />`のような必ず空要素のタグでしか省略することができない。

```html
<body>
  <!-- HTMLでは正しくパースされない -->
  <div id="app" />
  <script src="/bundle.js" />
</body>
```
