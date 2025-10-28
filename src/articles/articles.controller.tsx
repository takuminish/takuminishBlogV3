import ArticleDetailPage from "@/components/pages/ArticleDetailPage";
import ArticleIndexPage from "@/components/pages/ArticleIndexPage";
import NotFoundPage from "@/components/pages/NotFoundPage";
import { renderer } from "@/renderer";
import { Hono } from "hono";
import { ssgParams } from "hono/ssg";
import { getArticleDetailBySlug, getArticleHeads } from "./articles.service";
import { createOGP } from "@/ogp/ogp";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  const articles = getArticleHeads();

  return c.render(<ArticleIndexPage articles={articles} />, {
    title: "記事一覧",
    description: "記事一覧です。",
    ogImagePath: "",
  });
});

app.get(
  "/:slug",
  ssgParams(async () =>
    (await getArticleHeads()).map((head) => ({ slug: head.slug })),
  ),
  (c) => {
    const slug = c.req.param("slug");

    const article = getArticleDetailBySlug(slug);

    return c.render(<ArticleDetailPage article={article} />, {
      title: article.title,
      description: article.description,
      ogImagePath: `/images/${article.slug}.png`,
    });
  },
);

app.get(
  "/images/:slug",
  ssgParams(async () =>
    (await getArticleHeads()).map((head) => ({
      slug: head.slug,
    })),
  ),
  async (c) => {
    const slug = c.req.param("slug");

    const title = getArticleDetailBySlug(slug).title;

    c.header("Content-Type", "image/png");
    return c.body(await createOGP(title));
  },
);

export default app;
