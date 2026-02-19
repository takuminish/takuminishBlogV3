# CLAUDE.md

## プロジェクト概要

takuminishの個人技術ブログ。Hono + React でSSGし、Cloudflare Pagesにデプロイする静的サイト。

- URL: https://takuminish.pages.dev
- コンテンツ: 技術記事(articles)とスクラップ(scraps)の2種類

## 技術スタック

- **フレームワーク**: Hono (SSG via `@hono/vite-ssg`)
- **UI**: React 18 + Yamada UI
- **ビルド**: Vite 5
- **デプロイ**: Cloudflare Pages (wrangler)
- **パッケージマネージャ**: pnpm (enforced by `only-allow`)
- **言語**: TypeScript (strict mode)

## コマンド

- `pnpm dev` - 開発サーバー起動
- `pnpm build` - ビルド (SSG)
- `pnpm preview` - Cloudflare Pagesローカルプレビュー
- `pnpm check` - Biomeによるlint/format チェック (src配下)
- `pnpm check:fix` - Biomeによるlint/format 自動修正
- `pnpm check:article:markdown` - 記事のmarkdownlintチェック
- `pnpm check:article:text` - 記事のtextlintチェック (日本語技術文書ルール)

## プロジェクト構造

```
src/
├── index.tsx              # エントリーポイント (Honoルーティング)
├── renderer.tsx           # React SSR レンダラー (共通HTML/OGPメタ)
├── constants.ts           # 定数定義
├── global.d.ts
├── articles/              # 記事ドメイン
│   ├── articles.controller.tsx  # ルーティング
│   ├── articles.service.ts      # ビジネスロジック
│   ├── entity/articles.ts       # 型定義 (ArticleDetail, ArticleHead)
│   └── infra/articles.repository.ts  # ファイル読み込み (gray-matter)
├── scraps/                # スクラップドメイン (同構造)
├── components/
│   ├── pages/             # ページコンポーネント
│   └── shared/            # 共通コンポーネント
└── ogp/                   # OGP画像生成 (satori + sharp)
content/
├── articles/              # 記事Markdownファイル (gray-matter frontmatter)
└── scraps/                # スクラップMarkdownファイル
```

## アーキテクチャ

- ドメインごとに `controller` / `service` / `entity` / `infra` のレイヤー構造
- 記事はMarkdownファイル (`content/` 配下) で管理し、gray-matterでfrontmatterをパース
- パスエイリアス: `@/*` → `src/*`

## コーディング規約

- **Linter/Formatter**: Biome (recommended rules, スペースインデント)
- **日本語記事**: textlint (`preset-ja-technical-writing`) でチェック
- **コミットメッセージ**: Conventional Commits形式 (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`)
- **ブランチ名**: `feat/`, `fix/`, `docs/`, `scrap/`, `renovate/` プレフィックス

## コンテンツ追加

記事・スクラップのMarkdownファイルには以下のfrontmatterが必要:

```yaml
---
title: タイトル
date: "2024-05-01T22:12:03.284Z"
description: "説明文"
---
```
