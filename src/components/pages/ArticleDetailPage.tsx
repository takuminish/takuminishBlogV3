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
        <Heading bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
          <Center>{article.title}</Center>
        </Heading>
        <Center>{article.description}</Center>
        <Center>投稿日: {article.date.toISOString()}</Center>
      </Box>
      <Markdown>{article.body}</Markdown>
      <img src={`data:image/png;base64,${article.ogp}`} />
    </>
  );
}

export default ArticleDetailPage;
