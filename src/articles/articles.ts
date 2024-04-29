import { ArticleDetail, ArticleHead } from "./entity/articles";
import { getArticles } from "./infra/articles.repository";

export function getArticleHeads(): ArticleHead[] {
  return getArticleDetails().map((article) => ({ slug: article.slug }));
}

export function getArticleDetailBySlug(slug: string): ArticleDetail {
  const article = getArticleDetails().find((article) => slug === article.slug);

  if (!article) {
    throw new Error(`article not found(slug = ${slug}`);
  }

  return article;
}

export function getArticleDetails(): ArticleDetail[] {
  return getArticles();
}
