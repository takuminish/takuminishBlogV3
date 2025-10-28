import NotFoundPage from "@/components/pages/NotFoundPage";
import { renderer } from "@/renderer";
import { Hono } from "hono";
import { ssgParams } from "hono/ssg";
import { getScrapDetailBySlug, getScrapHeads } from "./scraps.service";
import { createOGP } from "@/ogp/ogp";
import ScrapIndexPage from "@/components/pages/ScrapIndexPage";
import ScrapDetailPage from "@/components/pages/ScrapDetailPage";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  const scraps = getScrapHeads();

  return c.render(<ScrapIndexPage scraps={scraps} />, {
    title: "スクラップ一覧",
    description: "スクラップ一覧です。",
    ogImagePath: "",
  });
});

app.get(
  "/:slug",
  ssgParams(async () =>
    (await getScrapHeads()).map((head) => ({ slug: head.slug })),
  ),
  (c) => {
    const slug = c.req.param("slug");

    const scrap = getScrapDetailBySlug(slug);

    return c.render(<ScrapDetailPage scrap={scrap} />, {
      title: scrap.title,
      ogImagePath: `/scraps/images/${scrap.slug}.png`,
    });
  },
);

app.get(
  "/images/:slug",
  ssgParams(async () =>
    (await getScrapHeads()).map((head) => ({
      slug: head.slug,
    })),
  ),
  async (c) => {
    const slug = c.req.param("slug");

    const title = getScrapDetailBySlug(slug).title;

    c.header("Content-Type", "image/png");
    return c.body(await createOGP(title));
  },
);

export default app;
