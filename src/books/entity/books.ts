/** @see docs/specifications/003-book.md */

/** Book内記事の詳細情報 */
export type BookArticleDetail = {
  slug: string;
  title: string;
  date: Date;
  description: string;
  order: number;
  body: string;
};

/** Book内記事の一覧表示用情報 */
export type BookArticleHead = {
  slug: string;
  title: string;
  date: Date;
  description: string;
  order: number;
};

/** Book内記事の前後ナビゲーション情報 */
export type BookArticleNav = {
  prev: { slug: string; title: string } | undefined;
  next: { slug: string; title: string } | undefined;
};

/** Chapterの詳細情報 */
export type ChapterDetail = {
  slug: string;
  title: string;
  order: number;
  description: string;
  articles: BookArticleDetail[];
};

/** Chapterの一覧表示用情報 */
export type ChapterHead = {
  slug: string;
  title: string;
  order: number;
  description: string;
  articleCount: number;
};

/** Bookの詳細情報 */
export type BookDetail = {
  slug: string;
  title: string;
  date: Date;
  description: string;
  body: string;
  articles: BookArticleDetail[];
  chapters: ChapterDetail[];
};

/** Bookの一覧表示用情報 */
export type BookHead = {
  slug: string;
  title: string;
  date: Date;
  description: string;
  articleCount: number;
};
