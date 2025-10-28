import { getArticles } from "@/articles/infra/articles.repository";
import createOGPFn from "@/ogp/infra/ogps.repository";
import type { ArticleDetail, ArticleHead } from "./entity/articles";

export function getArticleHeads(order?: number): ArticleHead[] {
  const heads = getArticleDetails().map((article) => ({
    slug: article.slug,
    title: article.title,
    date: article.date,
    description: article.description,
  }));

  if (!order) {
    return heads;
  }

  return heads.slice(0, order);
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
