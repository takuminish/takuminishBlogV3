# 記事（Articles）仕様

## ステータス

採用済み

## 選定日時

2024-05-01

## 概要

技術的なトピックをまとめた記事の仕様を定義する。

## 保存先

- ディレクトリ: `content/articles/`
- ファイル名: `{slug}.md`（slugがURLパスになる）

## Frontmatter

Markdownファイルの先頭にYAML形式のfrontmatterを記述する。パースには `gray-matter` を使用する。

```yaml
---
title: "記事タイトル"
date: "2024-05-01T22:12:03.284Z"
description: "記事の説明文"
---
```

全フィールド必須。

## データモデル

### ArticleDetail

| フィールド | 型 | 説明 |
|---|---|---|
| slug | `string` | URLパス用の識別子（ファイル名から拡張子を除いたもの） |
| title | `string` | 記事タイトル |
| date | `Date` | 公開日時 |
| description | `string` | 記事の説明文 |
| body | `string` | Markdown本文 |

### ArticleHead

`ArticleDetail` から `body` を除いた型。一覧表示用。

## データ読み込み

- `infra/articles.repository.ts` でモジュールスコープの即時実行非同期関数として読み込む
- `fs.readdirSync` でファイル一覧を取得し、`matter.read` で各ファイルをパースする
- 一度読み込んだデータはモジュールスコープに保持され、以降のアクセスではキャッシュが返る

## 参考

- gray-matter: https://github.com/jonschlinkert/gray-matter
