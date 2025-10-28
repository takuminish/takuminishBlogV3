import type { ArticleHead } from "@/articles/entity/articles";
import type { ScrapHead } from "@/scraps/entity/scrap";
import ArticleCard from "@/components/shared/ArticleCard";
import {
  Box,
  Flex,
  Heading,
  Link,
  Stack,
} from "@yamada-ui/react";

type Props = {
  articles: ArticleHead[];
  scraps: ScrapHead[];
};

function TopPage(props: Props) {
  const { articles, scraps } = props;

  return (
    <Stack gap="xl" maxW="800px" mx="auto">
      <Box textAlign="center" py="lg">
        <Heading
          size="2xl"
          color="gray.800"
          fontWeight="700"
          _dark={{ color: "gray.100" }}
        >
          Blog
        </Heading>
      </Box>

      <Box>
        <Flex justify="space-between" align="center" mb="lg">
          <Heading
            size="xl"
            color="gray.700"
            fontWeight="600"
            _dark={{ color: "gray.200" }}
          >
            最新の記事
          </Heading>
          <Link
            href="/articles"
            color="blue.600"
            fontWeight="500"
            _hover={{ color: "blue.700" }}
            _dark={{ color: "blue.400", _hover: { color: "blue.300" } }}
          >
            すべて見る
          </Link>
        </Flex>
        <Stack gap="md">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              description={article.description}
              date={article.date}
              href={generateArticleUrl(article.slug)}
            />
          ))}
        </Stack>
      </Box>

      <Box>
        <Flex justify="space-between" align="center" mb="lg">
          <Heading
            size="xl"
            color="gray.700"
            fontWeight="600"
            _dark={{ color: "gray.200" }}
          >
            最新のスクラップ
          </Heading>
          <Link
            href="/scraps"
            color="blue.600"
            fontWeight="500"
            _hover={{ color: "blue.700" }}
            _dark={{ color: "blue.400", _hover: { color: "blue.300" } }}
          >
            すべて見る
          </Link>
        </Flex>
        <Stack gap="md">
          {scraps.map((scrap) => (
            <ArticleCard
              key={scrap.slug}
              title={scrap.title}
              date={scrap.date}
              href={generateScrapUrl(scrap.slug)}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

function generateArticleUrl(slug: string): string {
  return `articles/${slug}`;
}

function generateScrapUrl(slug: string): string {
  return `scraps/${slug}`;
}

export default TopPage;
