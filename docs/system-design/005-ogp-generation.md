# OGP画像生成

## ステータス

採用済み

## 選定日時

2024-05-01

## 概要

記事・スクラップごとにOGP画像（Open Graph Protocol）をSSGビルド時に動的生成する仕組みを定義する。

## 技術構成

- **satori**: JSXからSVGを生成する
- **sharp**: SVGからPNG画像に変換する
- **budoux**: 日本語タイトルの自然な折り返し（分かち書き）を行う

## 生成フロー

```
タイトル文字列
  ↓ budoux で分かち書き
分かち書き済みの単語配列
  ↓ satori で JSX → SVG
SVG文字列
  ↓ sharp で SVG → PNG
PNG (ArrayBuffer)
```

## 画像仕様

- **サイズ**: 1200 x 630px
- **フォント**: NotoSansJP-Bold（`font/NotoSansJP-Bold.ttf`）
- **デザイン**:
  - 外枠: グラデーション背景（紫 `#7928CA` → ピンク `#FF0080`）、角丸40px
  - 内枠: 白背景（`#ffffff`）、角丸40px、1100 x 530px
  - タイトル: 中央配置、50px、太字700、幅70%で折り返し
  - ブログ名: タイトル下に100pxのギャップを空けて表示、50px、太字700

## エンドポイント

| パス | 説明 |
|---|---|
| `/articles/images/:slug` | 記事のOGP画像 |
| `/scraps/images/:slug` | スクラップのOGP画像 |
| `/books/images/:bookSlug` | BookのOGP画像 |

レスポンスヘッダー: `Content-Type: image/png`

## メタタグ

`renderer.tsx` にて `og:image` メタタグを設定する。`ogImagePath` が渡された場合のみ出力する。

```html
<meta property="og:image" content="{BLOG_URL}{ogImagePath}" />
<meta name="twitter:card" content="summary_large_image" />
```

## 参考

- satori: https://github.com/vercel/satori
- budoux: https://github.com/nicol-js/nicol
- sharp: https://sharp.pixelplumbing.com/
