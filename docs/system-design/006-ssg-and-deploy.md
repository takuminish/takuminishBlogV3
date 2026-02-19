# SSG・デプロイ仕様

## ステータス

採用済み

## 選定日時

2024-05-01

## 概要

Hono SSGによる静的サイト生成とCloudflare Pagesへのデプロイの仕様を定義する。

## SSG構成

### ビルドツール

- **Vite 5** をベースに以下のプラグインを使用する
  - `@hono/vite-dev-server`: 開発サーバー（Cloudflareアダプタ使用）
  - `@hono/vite-ssg`: SSGプラグイン

### エントリーポイント

`src/index.tsx` がSSGのエントリーポイントとなる。Vite設定で以下のように指定する:

```typescript
const entry = "src/index.tsx";
```

### 静的ルート生成

- 固定ルート（`/`, `/404`, `/articles/`, `/scraps/`）はそのまま生成される
- 動的ルート（`:slug`）は `ssgParams` で全パラメータを列挙し、各パターンに対してHTMLファイルを生成する
- OGP画像も同様に全slugに対してPNGファイルを生成する

### 出力ディレクトリ

`dist/` に生成される（`wrangler.toml` の `pages_build_output_dir` で指定）。

## デプロイ

### プラットフォーム

Cloudflare Pages

### デプロイコマンド

```bash
pnpm deploy  # = pnpm build && wrangler pages deploy dist
```

### プレビュー

```bash
pnpm preview  # = wrangler pages dev dist
```

## パスエイリアス

`@/*` → `src/*` のエイリアスを `tsconfig.json` と `vite.config.ts` の両方で設定する。

### tsconfig.json

```json
{
  "baseUrl": "./src",
  "paths": { "@/*": ["./*"] }
}
```

### vite.config.ts

```typescript
resolve: {
  alias: { "@/": `${__dirname}/src/` }
}
```

## 参考

- Hono SSG: https://hono.dev/docs/helpers/ssg
- Cloudflare Pages: https://developers.cloudflare.com/pages/
- wrangler: https://developers.cloudflare.com/workers/wrangler/
