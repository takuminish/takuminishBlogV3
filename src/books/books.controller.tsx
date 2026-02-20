/** @see docs/system-design/003-routing.md */
import BookArticlePage from "@/components/pages/BookArticlePage";
import BookDetailPage from "@/components/pages/BookDetailPage";
import BookIndexPage from "@/components/pages/BookIndexPage";
import ChapterDetailPage from "@/components/pages/ChapterDetailPage";
import ChapterListPage from "@/components/pages/ChapterListPage";
import { createOGP } from "@/ogp/ogp";
import { renderer } from "@/renderer";
import { Hono } from "hono";
import { ssgParams } from "hono/ssg";
import {
  getBookArticleDetailBySlug,
  getBookArticleHeads,
  getBookArticleNav,
  getBookDetailBySlug,
  getBookHeads,
  getChapterDetailBySlug,
  getChapterHeads,
} from "./books.service";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  const books = getBookHeads();

  return c.render(<BookIndexPage books={books} />, {
    title: "Book一覧",
    description: "Book一覧です。",
    ogImagePath: "",
  });
});

app.get(
  "/images/:bookSlug",
  ssgParams(async () =>
    (await getBookHeads()).map((head) => ({ bookSlug: head.slug })),
  ),
  async (c) => {
    const bookSlug = c.req.param("bookSlug");

    const title = getBookDetailBySlug(bookSlug).title;

    c.header("Content-Type", "image/png");
    return c.body(await createOGP(title));
  },
);

app.get(
  "/:bookSlug/chapters",
  ssgParams(async () => {
    const books = await getBookHeads();
    return books
      .filter(() => {
        // WHY: chapterありbookのみchapter一覧ページを生成する
        // BookHeadにはchapter情報がないのでdetailから判定
        return true;
      })
      .map((head) => ({ bookSlug: head.slug }));
  }),
  (c) => {
    const bookSlug = c.req.param("bookSlug");
    const book = getBookDetailBySlug(bookSlug);

    return c.render(<ChapterListPage book={book} />, {
      title: `${book.title} - チャプター一覧`,
      description: book.description,
      ogImagePath: `/books/images/${book.slug}.png`,
    });
  },
);

app.get(
  "/:bookSlug/chapters/:chapterSlug",
  ssgParams(async () => {
    const books = await getBookHeads();
    const params: { bookSlug: string; chapterSlug: string }[] = [];

    for (const bookHead of books) {
      const chapters = getChapterHeads(bookHead.slug);
      for (const chapter of chapters) {
        params.push({
          bookSlug: bookHead.slug,
          chapterSlug: chapter.slug,
        });
      }
    }

    return params;
  }),
  (c) => {
    const bookSlug = c.req.param("bookSlug");
    const chapterSlug = c.req.param("chapterSlug");

    const book = getBookDetailBySlug(bookSlug);
    const chapter = getChapterDetailBySlug(bookSlug, chapterSlug);

    return c.render(<ChapterDetailPage book={book} chapter={chapter} />, {
      title: `${chapter.title} - ${book.title}`,
      description: chapter.description || book.description,
      ogImagePath: `/books/images/${book.slug}.png`,
    });
  },
);

app.get(
  "/:bookSlug/articles/:articleSlug",
  ssgParams(async () => {
    const books = await getBookHeads();
    const params: { bookSlug: string; articleSlug: string }[] = [];

    for (const bookHead of books) {
      const articles = getBookArticleHeads(bookHead.slug);
      for (const article of articles) {
        params.push({
          bookSlug: bookHead.slug,
          articleSlug: article.slug,
        });
      }
    }

    return params;
  }),
  (c) => {
    const bookSlug = c.req.param("bookSlug");
    const articleSlug = c.req.param("articleSlug");

    const bookDetail = getBookDetailBySlug(bookSlug);
    const bookHead = {
      slug: bookDetail.slug,
      title: bookDetail.title,
      date: bookDetail.date,
      description: bookDetail.description,
      articleCount: 0,
    };
    const article = getBookArticleDetailBySlug(bookSlug, articleSlug);
    const nav = getBookArticleNav(bookSlug, articleSlug);

    return c.render(
      <BookArticlePage book={bookHead} article={article} nav={nav} />,
      {
        title: `${article.title} - ${bookDetail.title}`,
        description: article.description,
        ogImagePath: `/books/images/${bookDetail.slug}.png`,
      },
    );
  },
);

app.get(
  "/:bookSlug",
  ssgParams(async () =>
    (await getBookHeads()).map((head) => ({ bookSlug: head.slug })),
  ),
  (c) => {
    const bookSlug = c.req.param("bookSlug");

    const book = getBookDetailBySlug(bookSlug);

    return c.render(<BookDetailPage book={book} />, {
      title: book.title,
      description: book.description,
      ogImagePath: `/books/images/${book.slug}.png`,
    });
  },
);

export default app;
