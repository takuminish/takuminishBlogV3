import ArticleIndexPage from "@/components/pages/ArticleIndexPage";
import NotFoundPage from "@/components/pages/NotFoundPage";
import { renderer } from "@/renderer";
import { Hono } from "hono";
import articleApp from "@/articles/articles.controller";
import scrapApp from "@/scraps/scraps.controller";
import { getArticleHeads } from "./articles/articles.service";
import TopPage from "./components/pages/TopPage";
import { getScrapHeads } from "./scraps/scraps.service";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  const articles = getArticleHeads(10);
  const scraps = getScrapHeads(10);

  return c.render(<TopPage articles={articles} scraps={scraps} />, {
    title: "トップページ",
    description: "トップページです。",
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
