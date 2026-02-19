# スクラップ（Scraps）仕様

## ステータス

採用済み

## 選定日時

2024-05-01

## 概要

メモ的な短い記事や調査ログであるスクラップの仕様を定義する。

## 保存先

- ディレクトリ: `content/scraps/`
- ファイル名: `{slug}.md`（slugがURLパスになる）

## Frontmatter

Markdownファイルの先頭にYAML形式のfrontmatterを記述する。パースには `gray-matter` を使用する。

```yaml
---
title: "スクラップタイトル"
date: "2024-05-01T22:12:03.284Z"
---
```

全フィールド必須。記事と異なり `description` フィールドはない。

## データモデル

### ScrapDetail

| フィールド | 型 | 説明 |
|---|---|---|
| slug | `string` | URLパス用の識別子（ファイル名から拡張子を除いたもの） |
| title | `string` | スクラップタイトル |
| date | `Date` | 公開日時 |
| body | `string` | Markdown本文 |

### ScrapHead

`ScrapDetail` から `body` を除いた型。一覧表示用。

## データ読み込み

- `infra/scraps.repository.ts` でモジュールスコープの即時実行非同期関数として読み込む
- `fs.readdirSync` でファイル一覧を取得し、`matter.read` で各ファイルをパースする
- 一度読み込んだデータはモジュールスコープに保持され、以降のアクセスではキャッシュが返る

## 参考

- gray-matter: https://github.com/jonschlinkert/gray-matter
