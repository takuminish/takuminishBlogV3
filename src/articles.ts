import fs from "fs";
import path from "path";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeExpressiveCode from "rehype-expressive-code";
import customParseFrontMatter from "./frontmatter";

const FILE_PATH = "content/articles" as const;
const articlesFile = fs.readdirSync(FILE_PATH);

export type Article = {
  slug: string;
  title: string;
  date: Date;
  description: string;
  body: string;
};

/**
 * /content/articles以下のmarkdown形式で記述された記事一覧を取得する
 */
async function getArticles(): Promise<Article[]> {
  return Promise.all(
    articlesFile.map(async (file) => {
      console.log("ファイル読み込み");
      const filePath = path.join(FILE_PATH, file);
      const content = fs.readFileSync(filePath, { encoding: "utf-8" });

      console.log("mdファイル → htmlファイル");
      const result = await remark()
        .use(remarkParse)
        .use(remarkFrontmatter, [{ type: "yaml", marker: "-" }])
        .use(customParseFrontMatter)
        .use(rehypeExpressiveCode)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(content);

      console.log("変換完了");

      const article: Article = {
        slug: path.parse(path.basename(filePath)).name,
        title: result.data.matter?.title ?? "",
        date: new Date(result.data.matter?.date ?? ""),
        description: result.data.matter?.description ?? "",
        body: result.toString(),
      };
      return article;
    })
  );
}

export default getArticles;
