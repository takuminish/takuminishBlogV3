import type { ArticleHead } from "@/articles/entity/articles";
import type { ScrapHead } from "@/scraps/entity/scrap";
import {
  Box,
  Flex,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  Text,
} from "@yamada-ui/react";

type Props = {
  articles: ArticleHead[];
  scraps: ScrapHead[];
};

function TopPage(props: Props) {
  const { articles, scraps } = props;

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

  const scrapContents = scraps.map((scrap) => {
    return (
      <LinkBox
        key={scrap.slug}
        as="article"
        maxW={{ base: "100%" }}
        rounded="md"
        p="md"
        border="1px solid"
        borderColor="inherit"
        boxShadow="md"
      >
        <LinkOverlay href={generateScrapUrl(scrap.slug)} />
        <Heading
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          size="md"
        >
          {" "}
          {scrap.title}
        </Heading>
        <Text>投稿日: {scrap.date.toISOString()}</Text>
      </LinkBox>
    );
  });

  return (
    <Flex direction="column" justifyContent="center">
      <Box>
        <Heading>トップ</Heading>
      </Box>
      <Flex gap="md" direction="column">
        {articleContents}
      </Flex>
      <Box>
        <Link href="/articles">記事をもっと閲覧する</Link>
      </Box>
      <Flex gap="md" direction="column">
        {scrapContents}
      </Flex>
      <Box>
        <Link href="/articles">記事をもっと閲覧する</Link>
      </Box>
    </Flex>
  );
}

function generateArticleUrl(slug: string): string {
  return `articles/${slug}`;
}

function generateScrapUrl(slug: string): string {
  return `scraps/${slug}`;
}

export default TopPage;
