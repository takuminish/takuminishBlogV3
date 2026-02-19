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



## コンテンツ追加

記事・スクラップのMarkdownファイルには以下のfrontmatterが必要:

```yaml
---
title: タイトル
date: "2024-05-01T22:12:03.284Z"
description: "説明文"
---
```

## コーディング規約

- **Linter/Formatter**: Biome (recommended rules, スペースインデント)
- **日本語記事**: textlint (`preset-ja-technical-writing`) でチェック
- **コミットメッセージ**: Conventional Commits形式 (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`)
- **ブランチ名**: `feat/`, `fix/`, `docs/`, `scrap/`, `renovate/` プレフィックス
- **class は使用しない**。型（type）と純粋関数で構成する
- **enum は使用しない**。`as const` を使用する
- **default export は使用しない**。named export のみ
- **型のみのインポートには `import type` を使用する**
- ドメイン層・アプリケーション層の関数は**純粋関数**とする（副作用禁止）
- ファイル先頭に `@see` コメントで対応する設計書を記載する
- エクスポートされる型・関数には必ず TSDoc を書く
- 自明でない実装判断には WHY コメントを付ける

## 仕様書

仕様書はdocsディレクトリ内に保存されています。
- docs/specifications : ツールの仕様書
- docs/system-design : コード設計やアーキテクチャの仕様書

作業を行う際は仕様書を作成し、進めてください。実装や仕様を変更した場合は必ずdocsディレクトリの仕様書も修正してください。

コード設計やディレクトリ構成なども仕様書としてdocsディレクトリに保存してください。

## TDD ループ（厳守）

各関数の実装は以下のサイクルを守ること:

1. **テストを書く**（期待値は独立した計算で検算し、端数処理後の値を使用する）
2. **テスト実行** → RED を確認
3. **最小限の実装を書く**
4. **テスト実行** → GREEN を確認
5. 全テストが GREEN になってから次の関数に進む

## タスク管理

タスクはtodoディレクトリ内のmarkdownファイルで管理しています。詳細はtodo/README.mdを参照してください。

### 作業の進め方

1. 作業開始前にtodoディレクトリのタスク一覧を確認し、自分が着手するタスクを決定する
2. タスクの `status` を `in_progress` に変更し、`assignee` に自分の名前を記載する
3. `depends_on` に記載された依存タスクがすべて `done` であることを確認してから着手する
4. 作業完了後は `status` を `done` に変更する
5. ブロッカーがある場合は `status` を `blocked` にし、`notes` に理由を記載する

### コンフリクト防止

- 各タスクには「対象ファイル」が明記されている。`in_progress` のタスクの対象ファイルを他のエージェントが編集してはならない
- 同一フェーズ内で「並列可能」と明記されたタスクのみ同時に作業可能

## エージェントチーム運用ルール

マルチエージェントで作業する場合、以下を遵守すること:

- **タスク開始前に既存成果物を確認する**: 対象ファイルが既に存在するなら内容を読み、完了条件を満たしているかチェック。満たしている場合はスキップしてタスクリストを更新する
- **同一ファイルへの同時編集を禁止する**: in_progress タスクの対象ファイルに他のエージェントは触れない
- **チェックポイント**: 1フェーズ完了ごとにテスト全通過を確認し、MEMORY.md を更新する

## チェックポイント戦略

レートリミットや中断に備え、以下のタイミングで進捗を保全すること:

1. **フェーズ完了時**: テスト全通過確認 → git commit → MEMORY.md 更新
2. **MEMORY.md に記録する内容**: 完了フェーズ、テスト数、次にやること
3. **todo/ のステータス更新**: 完了タスクは即座に `done` に変更

