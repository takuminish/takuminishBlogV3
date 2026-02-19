# Lint・Format仕様

## ステータス

採用済み

## 選定日時

2024-05-01

## 概要

コードおよびコンテンツの品質を保つためのLint・Format設定を定義する。

## コード: Biome

### 対象

`src/` 配下の全ファイル

### 設定（`biome.json`）

- **インポート整理**: 有効（`organizeImports.enabled: true`）
- **Linter**: 有効、推奨ルール（`rules.recommended: true`）
- **Formatter**: スペースインデント（`indentStyle: "space"`）

### コマンド

```bash
pnpm check       # チェックのみ
pnpm check:fix   # 自動修正あり
```

## コンテンツ: textlint

### 対象

`content/articles/` 配下の全ファイル

### 設定（`.textlintrc.json`）

```json
{
  "rules": {
    "preset-ja-technical-writing": true
  }
}
```

日本語技術文書向けのプリセットルールを適用する。主なチェック項目:
- 一文の長さ
- 弱い表現の検出
- 同一接続詞の連続使用
- 全角・半角の混在

### コマンド

```bash
pnpm check:article:text
```

## コンテンツ: markdownlint

### 対象

`content/articles/*.md`

### コマンド

```bash
pnpm check:article:markdown
```

## 参考

- Biome: https://biomejs.dev/
- textlint: https://textlint.github.io/
- textlint-rule-preset-ja-technical-writing: https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing
- markdownlint: https://github.com/DavidAnson/markdownlint
