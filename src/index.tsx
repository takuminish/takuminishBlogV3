import { Hono } from "hono";
import { renderer } from "./renderer";
import { ssgParams } from "hono/ssg";
import getArticles from "./articles";

const app = new Hono();

app.use(renderer);

const articles = await getArticles();

app.get("/", (c) => {
  return c.render(<h1>Hello!</h1>, { title: "takuminishのブログ" });
});

app.get("/articles", (c) => {
  return c.render(<h1>Articles!</h1>, { title: "takuminishのブログ" });
});

app.get(
  "/articles/:slug",
  ssgParams(async () => articles.map((article) => ({ slug: article.slug }))),
  (c) => {
    const slug = c.req.param("slug");
    const article = articles.find((article) => article.slug === slug);
    
    if (!article) {
      return c.render(<h1>not found</h1>, { title: "not found" });
    }
    return c.render(
      <>
        <h1>{article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.body }}></div>
      </>,
      { title: "takuminishのブログ" }
    );
  }
);

export default app;
