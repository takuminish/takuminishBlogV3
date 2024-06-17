import fs from "node:fs";
import path from "node:path";
import type { ArticleDetail } from "@/articles//entity/articles";
import { ARTICLE_FILE_PATH } from "@/constants";
import matter from "gray-matter";

const articlesFile = fs.readdirSync(ARTICLE_FILE_PATH);

const articles = await (() => {
  return Promise.all(
    articlesFile.map(async (file) => {
      const filePath = path.join(ARTICLE_FILE_PATH, file);

      const {
        data: { title, date, description },
        content,
      } = matter.read(filePath);

      const slug = path.parse(path.basename(filePath)).name;

      const article: ArticleDetail = {
        slug,
        title,
        date: new Date(date),
        description,
        body: content,
      };
      return article;
    }),
  );
})();

export function getArticles(): ArticleDetail[] {
  return articles;
}
