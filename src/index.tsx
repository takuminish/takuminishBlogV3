import { Hono } from "hono";
import { renderer } from "./renderer";
import { ssgParams } from "hono/ssg";
import { serveStatic } from "@hono/node-server/serve-static";
import { getArticleDetailBySlug, getArticleHeads } from "./articles/articles";
import ArticleIndexPage from "./components/pages/ArticleIndexPage";
import ArticleDetailPage from "./components/pages/ArticleDetailPage";
import NotFoundPage from "./components/pages/NotFoundPage";

const BASE_TITLE = "takuminishのブログ" as const;

function createTitle(title: string) {
  return `${BASE_TITLE} | ${title}`;
}

const app = new Hono();

app.use(renderer);

app.use("/static/*", serveStatic({ root: "./public/static" }));

app.get("/", (c) => {
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
