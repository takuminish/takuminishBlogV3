import { ArticleDetail } from "../../articles/entity/articles";

type Props = {
  article: ArticleDetail;
};

function ArticleDetailPage(props: Props) {
  const { article } = props;

  return (
    <>
      <div>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <p>{article.date.toISOString()}</p>
      </div>
      <div>
        <div dangerouslySetInnerHTML={{ __html: article.body }}></div>
      </div>
    </>
  );
}

export default ArticleDetailPage;
