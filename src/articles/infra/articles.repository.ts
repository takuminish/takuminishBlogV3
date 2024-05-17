import fs from "fs";
import path from "path";
import { ArticleDetail } from "../entity/articles";
import matter from "gray-matter";
import createOGP from "./ogpHelper";

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

      const slug = path.parse(path.basename(filePath)).name;
      const ogp = await createOGP(title);

      const article: ArticleDetail = {
        slug,
        title,
        date: new Date(date),
        description,
        body: content,
        ogp
      };
      return article;
    })
  );
})();

export function getArticles(): ArticleDetail[] {
  return articles;
}
