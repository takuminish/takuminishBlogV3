/** @see docs/specifications/003-book.md */
import type {
  BookArticleDetail,
  BookArticleHead,
  BookArticleNav,
  BookDetail,
  BookHead,
  ChapterDetail,
  ChapterHead,
} from "@/books/entity/books";
import { getBooks } from "@/books/infra/books.repository";

/** Book内の総記事数を計算する */
function countArticles(book: BookDetail): number {
  if (book.chapters.length > 0) {
    return book.chapters.reduce(
      (sum, chapter) => sum + chapter.articles.length,
      0,
    );
  }
  return book.articles.length;
}

/** 全Bookのフラット化された記事一覧をorder順で取得する（ナビゲーション用） */
function getAllArticlesFlat(book: BookDetail): BookArticleDetail[] {
  if (book.chapters.length > 0) {
    return book.chapters.flatMap((chapter) => chapter.articles);
  }
  return book.articles;
}

/** Book一覧をdate降順で取得する */
export function getBookHeads(limit?: number): BookHead[] {
  const heads = getBookDetails()
    .map((book) => ({
      slug: book.slug,
      title: book.title,
      date: book.date,
      description: book.description,
      articleCount: countArticles(book),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  if (!limit) {
    return heads;
  }

  return heads.slice(0, limit);
}

/** slugからBookの詳細を取得する */
export function getBookDetailBySlug(bookSlug: string): BookDetail {
  const book = getBookDetails().find((book) => bookSlug === book.slug);

  if (!book) {
    throw new Error(`book not found(slug = ${bookSlug})`);
  }

  return book;
}

/** 全Bookの詳細一覧を取得する */
export function getBookDetails(): BookDetail[] {
  return getBooks();
}

/** BookのChapter一覧を取得する */
export function getChapterHeads(bookSlug: string): ChapterHead[] {
  const book = getBookDetailBySlug(bookSlug);
  return book.chapters.map((chapter) => ({
    slug: chapter.slug,
    title: chapter.title,
    order: chapter.order,
    description: chapter.description,
    articleCount: chapter.articles.length,
  }));
}

/** slugからChapterの詳細を取得する */
export function getChapterDetailBySlug(
  bookSlug: string,
  chapterSlug: string,
): ChapterDetail {
  const book = getBookDetailBySlug(bookSlug);
  const chapter = book.chapters.find((chapter) => chapterSlug === chapter.slug);

  if (!chapter) {
    throw new Error(
      `chapter not found(bookSlug = ${bookSlug}, chapterSlug = ${chapterSlug})`,
    );
  }

  return chapter;
}

/** slugからBook内記事の詳細を取得する */
export function getBookArticleDetailBySlug(
  bookSlug: string,
  articleSlug: string,
): BookArticleDetail {
  const book = getBookDetailBySlug(bookSlug);
  const allArticles = getAllArticlesFlat(book);
  const article = allArticles.find((article) => articleSlug === article.slug);

  if (!article) {
    throw new Error(
      `book article not found(bookSlug = ${bookSlug}, articleSlug = ${articleSlug})`,
    );
  }

  return article;
}

/** Book内の記事一覧をorder順で取得する */
export function getBookArticleHeads(bookSlug: string): BookArticleHead[] {
  const book = getBookDetailBySlug(bookSlug);
  const allArticles = getAllArticlesFlat(book);

  return allArticles.map((article) => ({
    slug: article.slug,
    title: article.title,
    date: article.date,
    description: article.description,
    order: article.order,
  }));
}

/** Book内記事の前後ナビゲーション情報を取得する（chapter間を横断する） */
export function getBookArticleNav(
  bookSlug: string,
  articleSlug: string,
): BookArticleNav {
  const book = getBookDetailBySlug(bookSlug);
  const allArticles = getAllArticlesFlat(book);

  const currentIndex = allArticles.findIndex(
    (article) => articleSlug === article.slug,
  );

  if (currentIndex === -1) {
    throw new Error(
      `book article not found(bookSlug = ${bookSlug}, articleSlug = ${articleSlug})`,
    );
  }

  const prev =
    currentIndex > 0
      ? {
          slug: allArticles[currentIndex - 1].slug,
          title: allArticles[currentIndex - 1].title,
        }
      : undefined;

  const next =
    currentIndex < allArticles.length - 1
      ? {
          slug: allArticles[currentIndex + 1].slug,
          title: allArticles[currentIndex + 1].title,
        }
      : undefined;

  return { prev, next };
}
