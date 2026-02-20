# ルーティング設計

## ステータス

採用済み

## 選定日時

2024-05-01

## 概要

Honoのルーティング機能を使用したURL設計を定義する。

## ルーティング一覧

### メインルーター（`src/index.tsx`）

| メソッド | パス | 説明 | レンダリング |
|---|---|---|---|
| GET | `/` | トップページ | `TopPage` |
| GET | `/404` | 404ページ | `NotFoundPage` |

サブルーターとして以下をマウントする:
- `/articles` → `articleApp`
- `/books` → `bookApp`
- `/scraps` → `scrapApp`

### 記事ルーター（`src/articles/articles.controller.tsx`）

| メソッド | パス | 説明 | レンダリング |
|---|---|---|---|
| GET | `/articles/` | 記事一覧 | `ArticleIndexPage` |
| GET | `/articles/:slug` | 記事詳細 | `ArticleDetailPage` |
| GET | `/articles/images/:slug` | 記事OGP画像（PNG） | バイナリレスポンス |

### スクラップルーター（`src/scraps/scraps.controller.tsx`）

| メソッド | パス | 説明 | レンダリング |
|---|---|---|---|
| GET | `/scraps/` | スクラップ一覧 | `ScrapIndexPage` |
| GET | `/scraps/:slug` | スクラップ詳細 | `ScrapDetailPage` |
| GET | `/scraps/images/:slug` | スクラップOGP画像（PNG） | バイナリレスポンス |

### Bookルーター（`src/books/books.controller.tsx`）

| メソッド | パス | 説明 | レンダリング |
|---|---|---|---|
| GET | `/books/` | Book一覧 | `BookIndexPage` |
| GET | `/books/:bookSlug` | Book詳細（目次） | `BookDetailPage` |
| GET | `/books/:bookSlug/chapters` | Chapter一覧 | `ChapterListPage` |
| GET | `/books/:bookSlug/chapters/:chapterSlug` | Chapter詳細 | `ChapterDetailPage` |
| GET | `/books/:bookSlug/articles/:articleSlug` | Book内記事 | `BookArticlePage` |
| GET | `/books/images/:bookSlug` | Book OGP画像（PNG） | バイナリレスポンス |

## SSGパラメータ

動的ルート（`:slug`）は `hono/ssg` の `ssgParams` を使って、ビルド時に全slugを列挙し静的ファイルを生成する。

```typescript
ssgParams(async () =>
  (await getArticleHeads()).map((head) => ({ slug: head.slug }))
)
```

## レンダラー

全ルートで共通の `renderer` ミドルウェアを使用する。`renderer.tsx` で定義され、以下のメタ情報を受け取る:

- `title`: ページタイトル（`{title} | takuminishのブログ` 形式で出力）
- `description`: ページ説明文
- `ogImagePath`: OGP画像パス（任意）

## 参考

- Hono SSG: https://hono.dev/docs/helpers/ssg
