# docs

設計書・仕様書の一覧と管理ルール。

## ディレクトリ構成

- `specifications/` : サイトの機能仕様書（記事・スクラップなど）
- `system-design/` : コード設計・アーキテクチャ・インフラの仕様書

各ディレクトリに `XXX-TEMPLATE.md` があるので、新規作成時はテンプレートに従うこと。

## specifications/

| ファイル | 内容 | ステータス |
|---|---|---|
| `001-article.md` | 記事の仕様（frontmatter、データモデル、読み込み） | 採用済み |
| `002-scrap.md` | スクラップの仕様（frontmatter、データモデル、読み込み） | 採用済み |
| `003-book.md` | Bookの仕様（frontmatter、データモデル、読み込み、chapter構造） | 採用済み |

## system-design/

| ファイル | 内容 | ステータス |
|---|---|---|
| `001-directory-structure.md` | ディレクトリ構成 | 採用済み |
| `002-layered-architecture.md` | レイヤードアーキテクチャ（controller/service/entity/infra） | 採用済み |
| `003-routing.md` | ルーティング設計（全エンドポイント、SSGパラメータ） | 採用済み |
| `004-component-design.md` | コンポーネント設計（ページ/共通、レイアウト、デザイン方針） | 採用済み |
| `005-ogp-generation.md` | OGP画像生成（satori + sharp + budoux） | 採用済み |
| `006-ssg-and-deploy.md` | SSG・デプロイ（Vite + Hono SSG、Cloudflare Pages） | 採用済み |
| `007-lint-and-format.md` | Lint・Format（Biome、textlint、markdownlint） | 採用済み |
