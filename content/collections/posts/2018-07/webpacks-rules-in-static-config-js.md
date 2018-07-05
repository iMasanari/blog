---
title: React StaticでTypeScriptを使用した時のエラー対処法
slug: webpacks-rules-in-static-config-js
tags: [ReactStatic, TypeScript, webpack]
date: 2018-07-03T11:47:13.910Z
---

## rulesを変更して`npm run build`するとエラーに

このブログはReact StaticのTypeScriptのexsampleがベースになっている。
サンプルは開発中(`npm run start`)では問題はないが、プロダクションビルド(`npm run build`)するとエラーになるのでその対処法をメモして置く。


```bash
$ npm run build
# ...
Error: Module build failed: Error: "extract-text-webpack-plugin" loader is used 
without the  corresponding plugin, refer to 
https://github.com/webpack/extract-text-webpack-plugin for th  e usage example
```

サンプルの初期コードどころか、そもそも下記の設定で動かなかった。

```js
// static.config.js

export default {
  // ...
  webpack: (config, { defaultLoaders }) => {
    config.module.rules = [{
      oneOf: [
        // ↓tsの設定を無くしデフォルトのを使用するもエラー継続
        defaultLoaders.jsLoader,
        defaultLoaders.cssLoader,
        defaultLoaders.fileLoader,
      ],
    }]
    
    return config
  }
}
```

デフォルトとは一体...

`config.module.rules`を変更しない場合は問題なくビルドすることができる。
`defaultLoaders.cssLoader`が悪さをしているようだ。

## 暫定的対処法

`defaultLoaders.cssLoader`を使わず、既存のルールの先頭に追加したい処理を置く。
ルールは`oneOf`で書かれているため、最初に一致するルールのみが使用される。先頭に追加することで、既存のルールは変更することなくマイルールを適用することができるのだ。

```js
// static.config.js

export default {
  // ...
  webpack: (config, { defaultLoaders }) => {
    config.resolve.extensions.push('.ts', '.tsx')

    config.module.rules[0].oneOf.unshift({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: defaultLoaders.jsLoader.exclude, // as std jsLoader exclude
      use: [
        { loader: 'babel-loader' },
        {
          loader: require.resolve('ts-loader'),
          options: { transpileOnly: true },
        },
      ],
    })

    return config
  },
}
```

現在はこのような設定になっている。
あまり気に入った方法ではないが、しばらくはこれで様子を見ることにする。
