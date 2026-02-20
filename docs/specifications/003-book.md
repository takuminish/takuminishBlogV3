# Book（ブック）仕様

## ステータス

採用済み

## 選定日時

2026-02-20

## 概要

複数のarticleを順序付きで束ねるコンテンツ形式。任意でchapter（章）によるグルーピングが可能。chapterあり/なしは1つのbookにつきどちらか一方のみ（共存不可）。

## 保存先

- ディレクトリ: `content/books/{bookSlug}/`
- chapterなし構成: `content/books/{bookSlug}/{articleSlug}.md`
- chapterあり構成: `content/books/{bookSlug}/chapters/{chapterSlug}/{articleSlug}.md`

### ディレクトリ構造

```
content/books/
  {bookSlug}/
    index.md                    # Book メタ情報
    {articleSlug}.md            # chapterなし構成の場合
    chapters/                   # chapterあり構成の場合
      {chapterSlug}/
        index.md                # Chapter メタ情報
        {articleSlug}.md
```

## Frontmatter

### Book index.md

```yaml
---
title: "Bookタイトル"
date: "2024-05-01T22:12:03.284Z"
description: "Bookの説明文"
---
```

全フィールド必須。

### Chapter index.md

```yaml
---
title: "Chapter タイトル"
order: 1
description: "Chapterの説明文"
---
```

`title` と `order` は必須。`description` は任意。`order` は正の整数で、chapter間の表示順序を決定する。

### Book内 Article

```yaml
---
title: "記事タイトル"
date: "2024-05-01T22:12:03.284Z"
description: "記事の説明文"
order: 1
---
```

全フィールド必須。`order` は正の整数で、chapter内（またはbook直下）の記事順序を決定する。

## データモデル

### BookDetail

| フィールド | 型 | 説明 |
|---|---|---|
| slug | `string` | URLパス用の識別子（ディレクトリ名） |
| title | `string` | Bookタイトル |
| date | `Date` | 公開日時 |
| description | `string` | Bookの説明文 |
| body | `string` | index.mdのMarkdown本文 |
| articles | `BookArticleDetail[]` | chapterなし構成の記事一覧 |
| chapters | `ChapterDetail[]` | chapterあり構成の章一覧 |

### BookHead

`BookDetail` から `body`, `articles`, `chapters` を除き、`articleCount` を追加した型。一覧表示用。

| フィールド | 型 | 説明 |
|---|---|---|
| slug | `string` | URLパス用の識別子 |
| title | `string` | Bookタイトル |
| date | `Date` | 公開日時 |
| description | `string` | Bookの説明文 |
| articleCount | `number` | Book内の総記事数 |

### ChapterDetail

| フィールド | 型 | 説明 |
|---|---|---|
| slug | `string` | URLパス用の識別子（ディレクトリ名） |
| title | `string` | Chapterタイトル |
| order | `number` | 表示順序 |
| description | `string` | Chapterの説明文（任意、デフォルト空文字列） |
| articles | `BookArticleDetail[]` | Chapter内の記事一覧 |

### ChapterHead

`ChapterDetail` から `articles` を除き、`articleCount` を追加した型。

| フィールド | 型 | 説明 |
|---|---|---|
| slug | `string` | URLパス用の識別子 |
| title | `string` | Chapterタイトル |
| order | `number` | 表示順序 |
| description | `string` | Chapterの説明文 |
| articleCount | `number` | Chapter内の記事数 |

### BookArticleDetail

| フィールド | 型 | 説明 |
|---|---|---|
| slug | `string` | URLパス用の識別子（ファイル名から拡張子を除いたもの） |
| title | `string` | 記事タイトル |
| date | `Date` | 公開日時 |
| description | `string` | 記事の説明文 |
| order | `number` | 表示順序 |
| body | `string` | Markdown本文 |

### BookArticleHead

`BookArticleDetail` から `body` を除いた型。

| フィールド | 型 | 説明 |
|---|---|---|
| slug | `string` | URLパス用の識別子 |
| title | `string` | 記事タイトル |
| date | `Date` | 公開日時 |
| description | `string` | 記事の説明文 |
| order | `number` | 表示順序 |

### BookArticleNav

前後のナビゲーション情報を持つ型。

| フィールド | 型 | 説明 |
|---|---|---|
| prev | `{ slug: string; title: string } \| undefined` | 前の記事 |
| next | `{ slug: string; title: string } \| undefined` | 次の記事 |

## ソート順

- **Book一覧**: `date` 降順
- **Chapter一覧**: `order` 昇順（同値の場合はslugのアルファベット順）
- **記事一覧**: `order` 昇順（同値の場合はslugのアルファベット順）

## データ読み込み

- `infra/books.repository.ts` でモジュールスコープの即時実行非同期関数として読み込む
- `fs.readdirSync` でbook一覧を取得し、各bookの `index.md` を `matter.read` でパースする
- `chapters/` ディレクトリの有無でchapterあり/なしを判定する
- 一度読み込んだデータはモジュールスコープに保持され、以降のアクセスではキャッシュが返る

## URL設計

| パス | 説明 |
|---|---|
| `/books/` | Book一覧ページ |
| `/books/:bookSlug` | Book詳細ページ（目次） |
| `/books/:bookSlug/chapters` | Chapter一覧ページ（chapterありbookのみ） |
| `/books/:bookSlug/chapters/:chapterSlug` | Chapter詳細ページ |
| `/books/:bookSlug/articles/:articleSlug` | Book内記事ページ |
| `/books/images/:bookSlug` | Book OGP画像 |

## 参考

- gray-matter: https://github.com/jonschlinkert/gray-matter
