import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from "@yamada-ui/react";
import type { ArticleHead } from "../../articles/entity/articles";

type Props = {
  articles: ArticleHead[];
};

function ArticleIndexPage(props: Props) {
  const { articles } = props;

  const articleContents = articles.map((article) => {
    return (
      <LinkBox
        key={article.slug}
        as="article"
        maxW={{ base: "100%" }}
        rounded="md"
        p="md"
        border="1px solid"
        borderColor="inherit"
        boxShadow="md"
      >
        <LinkOverlay href={generateArticleUrl(article.slug)} />
        <Heading
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          size="md"
        >
          {" "}
          {article.title}
        </Heading>

        <Text>{article.description}</Text>
        <Text>投稿日: {article.date.toISOString()}</Text>
      </LinkBox>
    );
  });

  return (
    <Flex direction="column" justifyContent="center">
      <Box>
        <Heading>記事一覧</Heading>
      </Box>
      <Flex gap="md" direction="column">
        {articleContents}
      </Flex>
    </Flex>
  );
}

function generateArticleUrl(slug: string): string {
  return `articles/${slug}`;
}

export default ArticleIndexPage;
