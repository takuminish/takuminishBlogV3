import type { ArticleHead } from "@/articles/entity/articles";
import ArticleCard from "@/components/shared/ArticleCard";
import {
  Box,
  Heading,
  Stack,
} from "@yamada-ui/react";

type Props = {
  articles: ArticleHead[];
};

function ArticleIndexPage(props: Props) {
  const { articles } = props;

  return (
    <Stack gap="xl" maxW="800px" mx="auto">
      <Box textAlign="center" py="lg">
        <Heading
          size="2xl"
          color="gray.800"
          fontWeight="700"
          _dark={{ color: "gray.100" }}
        >
          記事一覧
        </Heading>
      </Box>

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
    </Stack>
  );
}

function generateArticleUrl(slug: string): string {
  return `articles/${slug}`;
}

export default ArticleIndexPage;
