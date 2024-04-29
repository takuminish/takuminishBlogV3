import fs from "fs";
import path from "path";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeExpressiveCode from "rehype-expressive-code";
import { VFile } from "vfile";
import { matter } from "vfile-matter";
import { ArticleDetail } from "../entity/articles";

const FILE_PATH = "content/articles" as const;
const articlesFile = fs.readdirSync(FILE_PATH);

const articles = await (() => {
  return Promise.all(
    articlesFile.map(async (file) => {
      const filePath = path.join(FILE_PATH, file);
      const content = fs.readFileSync(filePath, { encoding: "utf-8" });

      const result = await remark()
        .use(remarkParse)
        .use(remarkFrontmatter, [{ type: "yaml", marker: "-" }])
        .use(customParseFrontMatter)
        .use(rehypeExpressiveCode)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(content);

      const article: ArticleDetail = {
        slug: path.parse(path.basename(filePath)).name,
        title: result.data.matter?.title ?? "",
        date: new Date(result.data.matter?.date ?? ""),
        description: result.data.matter?.description ?? "",
        body: result.toString(),
      };

      return article;
    })
  );
})();

// ref: https://github.com/remarkjs/remark-frontmatter
function customParseFrontMatter() {
  return function (_: any, file: VFile) {
    matter(file);
  };
}

export function getArticles(): ArticleDetail[] {
  return articles;
}
