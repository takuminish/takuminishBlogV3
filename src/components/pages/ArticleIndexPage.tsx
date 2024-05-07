import { ArticleHead } from "../../articles/entity/articles";

type Props = {
  articles: ArticleHead[];
};

function ArticleIndexPage(props: Props) {
  const { articles } = props;

  const articleContents = articles.map((article) => {
    return (
      <div>
        <h3>
          <a href={generateArticleUrl(article.slug)}>{article.title}</a>
        </h3>
        <p>{article.description}</p>
        <p>作成日: {article.date.toISOString()}</p>
      </div>
    );
  });

  return (
    <>
      <div>
        <h1>記事一覧</h1>
      </div>
      <div>{articleContents}</div>
    </>
  );
}

function generateArticleUrl(slug: string): string {
  return `articles/${slug}`;
}

export default ArticleIndexPage;
