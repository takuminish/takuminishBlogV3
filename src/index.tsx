import { Hono } from "hono";
import { renderer } from "./renderer";
import { ssgParams } from "hono/ssg";
import { getArticleDetailBySlug, getArticleHeads } from "./articles/articles";

const BASE_TITLE = "takuminishのブログ" as const;

function createTitle(title: string) {
  return `${BASE_TITLE} | ${title}`;
}

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  return c.redirect("/articles");
});

app.get("/articles", (c) => {
  return c.render(<h1>Articles!</h1>, { title: createTitle("記事一覧") });
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
      return c.render(<h1>404 NotFound. 記事が見つかりません</h1>, {
        title: createTitle("記事が見つかりません"),
      });
    }

    return c.render(
      <>
        <h1>{article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.body }}></div>
      </>,
      { title: createTitle(article.title) }
    );
  }
);

app.get("/404", (c) => {
  return c.render(<h1>404 NotFound. 記事が見つかりません</h1>, {
    title: createTitle("記事が見つかりません"),
  });
});

export default app;
