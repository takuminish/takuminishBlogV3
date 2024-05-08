import fs from "fs";
import path from "path";
import { ArticleDetail } from "../entity/articles";
import matter from "gray-matter";

const FILE_PATH = "content/articles" as const;
const articlesFile = fs.readdirSync(FILE_PATH);

const articles = await (() => {
  return Promise.all(
    articlesFile.map(async (file) => {
      const filePath = path.join(FILE_PATH, file);

      const {
        data: { title, date, description },
        content,
      } = matter.read(filePath);

      const article: ArticleDetail = {
        slug: path.parse(path.basename(filePath)).name,
        title,
        date: new Date(date),
        description,
        body: content,
      };

      return article;
    })
  );
})();

export function getArticles(): ArticleDetail[] {
  return articles;
}
