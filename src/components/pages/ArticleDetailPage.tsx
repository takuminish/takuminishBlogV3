import { Box, Center, Heading } from "@yamada-ui/react";
import { ArticleDetail } from "../../articles/entity/articles";
import { Markdown } from "@yamada-ui/markdown";

type Props = {
  article: ArticleDetail;
};

function ArticleDetailPage(props: Props) {
  const { article } = props;

  return (
    <>
      <Box>
        <Heading>{article.title}</Heading>
        <Center>{article.description}</Center>
        <Center>投稿日: {article.date.toISOString()}</Center>
      </Box>
      <Markdown>{article.body}</Markdown>
    </>
  );
}

export default ArticleDetailPage;
