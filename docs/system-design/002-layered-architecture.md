# レイヤードアーキテクチャ

## ステータス

採用済み

## 選定日時

2024-05-01

## 概要

各ドメイン（articles, scraps, books）は以下の4層で構成される。

## レイヤー定義

### Controller層（`*.controller.tsx`）

- Honoのルーティング定義を担当する
- リクエストを受け取り、Service層を呼び出し、ページコンポーネントをレンダリングする
- SSGパラメータ（`ssgParams`）の定義もこの層で行う
- OGP画像生成エンドポイントもController層に含む

### Service層（`*.service.ts`）

- ビジネスロジックを担当する
- Repository層からデータを取得し、必要に応じて加工して返す
- 一覧取得（`getXxxHeads`）、詳細取得（`getXxxDetailBySlug`）などの関数を提供する
- `order` パラメータによる件数制限などのロジックを持つ

### Entity層（`entity/*.ts`）

- ドメインの型定義を担当する
- `Detail` 型（全フィールド）と `Head` 型（一覧用の要約）の2種類を定義する

### Infra層（`infra/*.repository.ts`）

- データソースへのアクセスを担当する
- ファイルシステムからMarkdownファイルを読み込み、gray-matterでパースする
- モジュールスコープで初回読み込みを行い、キャッシュする

## データフロー

```
Controller → Service → Infra(Repository)
                ↓
             Entity（型定義）
```

1. Controller がHTTPリクエストを受け取る
2. Service の関数を呼び出す
3. Service は Infra(Repository) からデータを取得する
4. Repository は `content/` 配下のMarkdownファイルを読み込み、Entity型に変換する
5. Service はデータを加工してControllerに返す
6. Controller はページコンポーネントをレンダリングする

## 命名規約

| レイヤー | ファイル名パターン | 例 |
|---|---|---|
| Controller | `{domain}.controller.tsx` | `articles.controller.tsx` |
| Service | `{domain}.service.ts` | `articles.service.ts` |
| Entity | `entity/{domain}.ts` | `entity/articles.ts` |
| Infra | `infra/{domain}.repository.ts` | `infra/articles.repository.ts` |

## 参考

- なし
