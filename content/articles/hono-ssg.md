---
title: 【hono】 honoでSSGを行い、CloudflarePagesにデプロイする
date: "2024-05-01T22:12:03.284Z"
description: "このブログはhonoのSSGで構築しており、CloudflarePagesにデプロイしています。projectの作成からデプロイまでの手順を残します。"
---


# hono

- https://hono.dev/

# project の作成

- https://hono.dev/getting-started/cloudflare-pages の通りに進めます。

今回は、package manager に npm を選択しています。

```bash
$ npm create hono@latest
? Target directory takuminishBlog
? Which template do you want to use? cloudflare-pages
✔ Cloning the template
? Do you want to install project dependencies? yes
? Which package manager do you want to use? npm
⠏ Installing project dependencies
```

すると、以下のディレクトリ構成が自動で生成されます

```bash
./
├── package.json
├── public
│   └── static // Put your static files.
│       └── style.css // You can refer to it as `/static/style.css`.
├── src
│   ├── index.tsx // The entry point for server-side.
│   └── renderer.tsx
├── tsconfig.json
└── vite.config.ts
```

# SSG の設定

[@hono/vite-ssg](https://github.com/honojs/vite-plugins/tree/main/packages/ssg)を使用して、SSG の設定をしていきます。

```bash
$ npm i -D @hono/vite-ssg
```

vite.config.ts に SSG の設定を追記します。

```diff
import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";
import { defineConfig } from "vite";
+ import ssg from "@hono/vite-ssg";

const entry = "src/index.tsx";
export default defineConfig({
  plugins: [
    devServer({
      adapter,
      entry,
    }),
+    ssg({
+      entry,
+    }),
  ],
});

```

この状態で`vite build(npm run build)`を実行すると、デフォルトで`distディレクトリ`直下に SSG の成果物が出力されます。

# entrypoint の定義

index.tsx に以下の entrypoint を定義していきます。

- `/` : `/articles`へのリダイレクト
- `/articles` : 記事一覧ページ
- `articles/:slug` : 各記事ページ
- `/404` : Cloudflare Pages で Not Found ページを表示するための entry point

## jsxrerender

- https://hono.dev/middleware/builtin/jsx-renderer
- cloudflare pages の setup を選択している場合は、自動で　https://hono.dev/middleware/builtin/jsx-renderer#nested-layouts　の使用方法で index.tsx と renderer.tsx が生成される。

```typescript
export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html>
      <head>
        <title>{title}</title>
      </head>
      <body class={bodyClass}>{children}</body>
    </html>
  );
});
```

index.tsx では以下のように指定することで、renderer.tsx のレイアウトをテンプレートとして、jsx をレンダリングできる。

```typescript
const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  return c.render(<h1>test</h1>, { title: "test" });
});
```

上記を c.render ではなく、c.html で既述すると以下のようになる

```typescript
const app = new Hono();

app.get("/", (c) => {
  return c.html(
    <html>
      <head>
        <title>test</title>
      </head>
      <body>
        <h1>test</h1>
      </body>
    </html>
  );
});
```

型定義ファイルとして、global.d.ts も自動生成される

```typescript
declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { title?: string }): Response;
  }
}
```

## index.tsx

上記の jsxRenderer を踏まえて、index.tsx を実装する。

```typescript
// importは省略

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  return c.redirect("/articles");
});

app.get("/articles", (c) => {
  const articles = getArticleHeads();

  return c.render(<ArticleIndexPage articles={articles} />, {
    title: createTitle("記事一覧"),
  });
});

app.get(
  "/articles/:slug",
  ssgParams(async () =>
    (await getArticleHeads()).map((head) => ({ slug: head.slug }))
  ),
  async (c) => {
    const slug = c.req.param("slug");

    let article;
    try {
      article = await getArticleDetailBySlug(slug);
    } catch (e) {
      return c.render(<NotFoundPage />, {
        title: createTitle("記事が見つかりません"),
      });
    }

    return c.render(<ArticleDetailPage article={article} />, {
      title: createTitle(article.title),
    });
  }
);

app.get("/404", (c) => {
  return c.render(<NotFoundPage />, {
    title: createTitle("記事が見つかりません"),
  });
});

export default app;
```

特に`/article/:slug`について説明する。

```typescript
app.get(
  "/articles/:slug",
  ssgParams(async () =>
    (await getArticleHeads()).map((head) => ({ slug: head.slug }))
  ),
  async (c) => {
    const slug = c.req.param("slug");
    ... (中略)
  }
);
```

ssgParams の callback 関数の戻り値(object の Array)が静的に生成する path になる。上記の場合、key が slug の value が`/articles/:slug`の:slug に設定される。

また、callback 関数の戻り値.req.param から取り出すことができる。

# CloudflarePages にデプロイ

- https://zenn.dev/rivine/articles/2023-06-23-deploy-hugo-to-cloudflare-pages の通りに行いました。

- Production Branch : main
- Build Command : npm run build
- Build output directory : /dist

子の状態で、mainブランチが更新されると、
1. GitHubからのfetch
2. npm run buildの実行
が自動で実行され、pageが更新されます。

# 感想

話題の hono をつかって、ブログサイトを作ってみました。かなり軽量で使い勝手が良かったです。project 作成からデプロイまでがとてもスムーズで Cloudflare のアカウント作成を含めても、10 分かからないくらいでした。
jsx でかけるのもかなり良くて、軽量な Web サイトなら hono でいいんじゃないかと思うぐらいです。

今後も hono の動向を追っていきたいですね。

# 参考

- remark の実装周りで参考にした
  - https://github.com/remarkjs/remark
  - https://github.com/unifiedjs/unified
  - https://github.com/remarkjs/remark-frontmatter
  - https://github.com/vfile/vfile-matter?tab=readme-ov-file#types
- hono で SSG を行っている事例
  - https://tkancf.com/blog/blog-migration-astro-to-hono
- Cloudflare Pages で不正な URL にアクセスした場合、指定の page を表示する方法の調査
  - https://developers.cloudflare.com/pages/configuration/serving-pages/
