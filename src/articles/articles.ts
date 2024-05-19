import type { ArticleDetail, ArticleHead } from "./entity/articles";
import { getArticles } from "./infra/articles.repository";
import createOGPFn from "./infra/ogps.repository";

export function getArticleHeads(): ArticleHead[] {
	return getArticleDetails().map((article) => ({
		slug: article.slug,
		title: article.title,
		date: article.date,
		description: article.description,
	}));
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

export function createOGP(title: string): Promise<Buffer> {
	return createOGPFn(title);
}
