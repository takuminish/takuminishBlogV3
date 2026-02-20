/** @see docs/specifications/003-book.md */
import fs from "node:fs";
import path from "node:path";
import type {
  BookArticleDetail,
  BookDetail,
  ChapterDetail,
} from "@/books/entity/books";
import { BOOK_FILE_PATH } from "@/constants";
import matter from "gray-matter";

/** order昇順、同値の場合はslugのアルファベット順でソートする */
function sortByOrder<T extends { order: number; slug: string }>(
  items: T[],
): T[] {
  return [...items].sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.slug.localeCompare(b.slug);
  });
}

/** Markdownファイルを読み込みBookArticleDetailに変換する */
function readArticle(filePath: string): BookArticleDetail {
  const {
    data: { title, date, description, order },
    content,
  } = matter.read(filePath);

  const slug = path.parse(path.basename(filePath)).name;

  return {
    slug,
    title,
    date: new Date(date),
    description,
    order,
    body: content,
  };
}

/** chaptersディレクトリからChapterDetail一覧を読み込む */
function readChapters(chaptersDir: string): ChapterDetail[] {
  const chapterDirs = fs.readdirSync(chaptersDir).filter((entry) => {
    return fs.statSync(path.join(chaptersDir, entry)).isDirectory();
  });

  const chapters = chapterDirs.map((chapterSlug) => {
    const chapterDir = path.join(chaptersDir, chapterSlug);
    const indexPath = path.join(chapterDir, "index.md");

    const {
      data: { title, order, description },
    } = matter.read(indexPath);

    const articleFiles = fs
      .readdirSync(chapterDir)
      .filter((f) => f.endsWith(".md") && f !== "index.md");

    const articles = sortByOrder(
      articleFiles.map((file) => readArticle(path.join(chapterDir, file))),
    );

    const chapter: ChapterDetail = {
      slug: chapterSlug,
      title,
      order,
      description: description ?? "",
      articles,
    };

    return chapter;
  });

  return sortByOrder(chapters);
}

const bookDirs = fs.readdirSync(BOOK_FILE_PATH).filter((entry) => {
  return fs.statSync(path.join(BOOK_FILE_PATH, entry)).isDirectory();
});

const books = await (async () => {
  return Promise.all(
    bookDirs.map(async (bookSlug) => {
      const bookDir = path.join(BOOK_FILE_PATH, bookSlug);
      const indexPath = path.join(bookDir, "index.md");

      const {
        data: { title, date, description },
        content,
      } = matter.read(indexPath);

      const chaptersDir = path.join(bookDir, "chapters");
      const hasChapters =
        fs.existsSync(chaptersDir) && fs.statSync(chaptersDir).isDirectory();

      let articles: BookArticleDetail[] = [];
      let chapters: ChapterDetail[] = [];

      if (hasChapters) {
        chapters = readChapters(chaptersDir);
      } else {
        const articleFiles = fs
          .readdirSync(bookDir)
          .filter((f) => f.endsWith(".md") && f !== "index.md");

        articles = sortByOrder(
          articleFiles.map((file) => readArticle(path.join(bookDir, file))),
        );
      }

      const book: BookDetail = {
        slug: bookSlug,
        title,
        date: new Date(date),
        description,
        body: content,
        articles,
        chapters,
      };

      return book;
    }),
  );
})();

/** 全Bookの詳細一覧を取得する */
export function getBooks(): BookDetail[] {
  return books;
}
