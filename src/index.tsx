import ArticleIndexPage from "@/components/pages/ArticleIndexPage";
import NotFoundPage from "@/components/pages/NotFoundPage";
import { renderer } from "@/renderer";
import { Hono } from "hono";
import articleApp from "@/articles/articles.controller";
import scrapApp from "@/scraps/scraps.controller";
import { getArticleHeads } from "./articles/articles.service";

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

app.get("/404", (c) => {
  return c.render(<NotFoundPage />, {
    title: "記事が見つかりません",
    description: "記事が見つかりません",
    ogImagePath: "",
  });
});

app.route("/articles", articleApp);
app.route("/scraps", scrapApp);


export default app;
