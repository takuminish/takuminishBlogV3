import { ArticleHead } from "../../articles/entity/articles";

type Props = {
  articles: ArticleHead[];
};

function ArticleIndexPage(props: Props) {
  const { articles } = props;

  const articleContents = articles.map((article) => {
    return (
      <div>
        <p>
          <a href={generateArticleUrl(article.slug)}>{article.title}</a>
        </p>{" "}
        <p>{article.description}</p>
        <p>{article.date.toISOString()}</p>
      </div>
    );
  });

  return (
    <>
      <h1>記事一覧</h1>
      {articleContents}
    </>
  );
}

function generateArticleUrl(slug: string): string {
  return `articles/${slug}`;
}

export default ArticleIndexPage;
