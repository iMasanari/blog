---
title: GitHub PagesのUser Pageにdistフォルダをデプロイする
description: User Pageにはmasterブランチしか指定できないようです。そこに任意のフォルダの中身をデプロイする方法を書きました。
slug: deploy-to-github-pages-user-page
tags: [GitHubPages]
date: 2018-07-01T15:11:38.719Z
update: 2018-07-02T13:49:48.876Z
---

## User Pageにはmasterブランチしか指定できない

みたいです。
しかもルート指定もできないようです。

GitHubは今までProject Pageしか使っていなかったので、`gh-pages`ブランチを指定できず焦りました。
というわけでググります。

## どうやらmasterを殺せばいいらしい

このQiitaの記事を参考に作業していきます。

[GitHub PagesのUser Pagesでドキュメントルートを変更するにはmasterを殺す](https://qiita.com/kwappa/items/03ffdeb89039a7249619)

`master`ブランチを削除して、指定フォルダをsubtreeとしてpushするらしいです。

手順通りに作業し、残るはpushのみ…

```bash
$ git subtree push --prefix dist/ origin master
git push using:  origin master
No new revisions were found
```

はい、うまくいかず！
`master`ブランチは追加されませんでした。

`No new revisions were found`を読むと、更新ファイルが無いとのことらしいです。`dist`フォルダを`.gitignore`しているのが原因でしょう。

## gh-pagesに頼る

`dist`フォルダを開発のgit管理に入れたくないし、だからと言ってデプロイのたびに`add -f`していくのは面倒です。
なので、[gh-pages](https://github.com/tschaub/gh-pages)で`master`にデプロイできるか試してみます。

調べてみると、どうやらブランチを指定するオプションは`-b`(`--branch`)のようです。
実は`gh-pages`ブランチにpushした時はこれを使ったんですけど、subtreeをpushする方法を調べた時にアンインストールしてしまっていたんですね。
再インストールして、以下のコマンドを叩きます。

```bash
$ npx gh-pages -d dist -b master
```

これで無事デプロイが完了しました！


## まとめ

gitにはsubtreeという機能がある。
でも`.gitignore`が優先されてしまう。
[gh-pages](https://github.com/tschaub/gh-pages)が超便利！
