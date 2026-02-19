# ディレクトリ構成

## ステータス

採用済み

## 選定日時

2024-05-01

## 概要

プロジェクト全体のディレクトリ構成を定義する。

## ディレクトリツリー

```
/
├── content/                    # コンテンツ（Markdownファイル）
│   ├── articles/               # 技術記事
│   └── scraps/                 # スクラップ（メモ的な短い記事）
├── docs/                       # 設計書・仕様書
│   ├── specifications/         # ツール・ライブラリの仕様書
│   └── system-design/          # コード設計・アーキテクチャの仕様書
├── font/                       # フォントファイル（OGP画像生成用）
├── src/                        # アプリケーションソースコード
│   ├── index.tsx               # エントリーポイント（Honoルーティング）
│   ├── renderer.tsx            # React SSRレンダラー（共通HTML/メタタグ）
│   ├── constants.ts            # 定数定義
│   ├── global.d.ts             # グローバル型定義
│   ├── articles/               # 記事ドメイン
│   │   ├── articles.controller.tsx
│   │   ├── articles.service.ts
│   │   ├── entity/articles.ts
│   │   └── infra/articles.repository.ts
│   ├── scraps/                 # スクラップドメイン
│   │   ├── scraps.controller.tsx
│   │   ├── scraps.service.ts
│   │   ├── entity/scrap.ts
│   │   └── infra/scraps.repository.ts
│   ├── components/             # Reactコンポーネント
│   │   ├── pages/              # ページコンポーネント
│   │   └── shared/             # 共通コンポーネント
│   └── ogp/                    # OGP画像生成
│       ├── ogp.ts
│       └── infra/ogps.repository.tsx
├── biome.json                  # Biome設定
├── .textlintrc.json            # textlint設定
├── package.json
├── tsconfig.json
├── vite.config.ts
└── wrangler.toml               # Cloudflare Pages設定
```

## 設計方針

- `src/` 配下はドメインごとにディレクトリを分割する
- 各ドメインは `controller` / `service` / `entity` / `infra` のレイヤー構造を持つ（詳細は `002-layered-architecture.md` を参照）
- `content/` 配下にMarkdownファイルを配置し、ビルド時に読み込む
- `components/` は `pages/`（ページ単位）と `shared/`（再利用可能な共通部品）に分割する

## 参考

- Hono公式ドキュメント: https://hono.dev/
