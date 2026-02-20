# コンポーネント設計

## ステータス

採用済み

## 選定日時

2024-05-01

## 概要

Reactコンポーネントの構成とUIライブラリの使用方針を定義する。

## UIライブラリ

Yamada UIを使用する。全コンポーネントは `UIProvider` でラップされている（`renderer.tsx` にて）。

## コンポーネント分類

### ページコンポーネント（`components/pages/`）

各ルートに対応する1ページ分のコンポーネント。

| コンポーネント | 用途 | Props |
|---|---|---|
| `TopPage` | トップページ。最新記事10件・スクラップ6件・Book3件を表示 | `articles: ArticleHead[]`, `scraps: ScrapHead[]`, `books: BookHead[]` |
| `ArticleIndexPage` | 記事一覧ページ | `articles: ArticleHead[]` |
| `ArticleDetailPage` | 記事詳細ページ。Markdownをレンダリング | `article: ArticleDetail` |
| `ScrapIndexPage` | スクラップ一覧ページ。グリッドレイアウト | `scraps: ScrapHead[]` |
| `ScrapDetailPage` | スクラップ詳細ページ。Markdownをレンダリング | `scrap: ScrapDetail` |
| `BookIndexPage` | Book一覧ページ | `books: BookHead[]` |
| `BookDetailPage` | Book詳細ページ。目次（chapter/article一覧）を表示 | `book: BookDetail` |
| `ChapterListPage` | Chapter一覧ページ | `book: BookDetail` |
| `ChapterDetailPage` | Chapter詳細ページ。article一覧を表示 | `book: BookDetail`, `chapter: ChapterDetail` |
| `BookArticlePage` | Book内記事ページ。パンくず＋prev/nextナビ | `book: BookHead`, `article: BookArticleDetail`, `nav: BookArticleNav` |
| `NotFoundPage` | 404ページ | なし |

### 共通コンポーネント（`components/shared/`）

複数ページで再利用される部品。

| コンポーネント | 用途 | Props |
|---|---|---|
| `BlogBody` | ページ全体のレイアウト（Header + メインコンテンツ） | `children: ReactNode` |
| `Header` | スティッキーヘッダー。ブログタイトルとナビゲーション | なし |
| `Footer` | フッター。コピーライト表示 | なし |
| `ArticleCard` | 記事一覧のカード。タイトル・説明・日付を表示 | `title`, `description?`, `date`, `href` |
| `BookCard` | Book一覧のカード。タイトル・説明・日付・記事数を表示 | `title`, `description?`, `date`, `href`, `articleCount` |
| `ScrapCard` | スクラップ一覧のカード。付箋風デザイン | `title`, `date`, `href`, `index?` |

## レイアウト構造

```
<html>
  <UIProvider>
    <Flex justifyContent="center">
      <BlogBody>         ← maxW 1024px
        <Header />       ← sticky, maxW 1200px
        <main>
          {children}     ← ページコンポーネント
        </main>
      </BlogBody>
    </Flex>
    <Footer />
  </UIProvider>
</html>
```

## デザイン方針

- **記事カード**: ボーダー付きのシンプルなカードデザイン。ホバー時に上方向へ浮く
- **スクラップカード**: 付箋風デザイン。色のローテーション（5色）と微妙な回転で手作り感を演出。ピン留め風の擬似要素を持つ
- **ダークモード対応**: Yamada UIの `_dark` propを使用して全コンポーネントで対応
- **レスポンシブ対応**: スクラップ一覧はグリッドレイアウトで、画面幅に応じてカラム数を変更（1→2→3→4列）
- **スクラップのフォント**: 見出し部分に `Comic Sans MS` を使用し、カジュアルな印象を与える

## Markdownレンダリング

記事・スクラップの本文は `@yamada-ui/markdown` の `<Markdown>` コンポーネントでレンダリングする。

## 参考

- Yamada UI: https://yamada-ui.com/
