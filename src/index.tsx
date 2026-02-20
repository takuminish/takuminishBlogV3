import articleApp from "@/articles/articles.controller";
import bookApp from "@/books/books.controller";
import NotFoundPage from "@/components/pages/NotFoundPage";
import { renderer } from "@/renderer";
import scrapApp from "@/scraps/scraps.controller";
import { Hono } from "hono";
import { getArticleHeads } from "./articles/articles.service";
import { getBookHeads } from "./books/books.service";
import TopPage from "./components/pages/TopPage";
import { getScrapHeads } from "./scraps/scraps.service";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  const articles = getArticleHeads(10);
  const scraps = getScrapHeads(10);
  const books = getBookHeads(3);

  return c.render(
    <TopPage articles={articles} scraps={scraps} books={books} />,
    {
      title: "トップページ",
      description: "トップページです。",
      ogImagePath: "",
    },
  );
});

app.get("/404", (c) => {
  return c.render(<NotFoundPage />, {
    title: "記事が見つかりません",
    description: "記事が見つかりません",
    ogImagePath: "",
  });
});

app.route("/articles", articleApp);
app.route("/books", bookApp);
app.route("/scraps", scrapApp);

export default app;
