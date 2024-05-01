import { ArticleDetail } from "../../articles/entity/articles";

type Props = {
  article: ArticleDetail;
};

function ArticleDetailPage(props: Props) {
  const { article } = props;

  return (
    <>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.body }}></div>
    </>
  );
}

export default ArticleDetailPage;