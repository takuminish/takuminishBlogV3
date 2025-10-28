import type { ArticleDetail } from "@/articles/entity/articles";
import { Markdown } from "@yamada-ui/markdown";
import { Box, Heading, Stack, Text } from "@yamada-ui/react";

type Props = {
  article: ArticleDetail;
};

function ArticleDetailPage(props: Props) {
  const { article } = props;

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <Stack gap="xl" maxW="800px" mx="auto">
      <Box textAlign="center" py="xl" borderBottom="1px solid" borderColor="gray.200" _dark={{ borderColor: "gray.700" }}>
        <Heading
          size="3xl"
          color="gray.800"
          fontWeight="700"
          mb="md"
          lineHeight="1.2"
          _dark={{ color: "gray.100" }}
        >
          {article.title}
        </Heading>
        {article.description && (
          <Text
            fontSize="lg"
            color="gray.600"
            mb="sm"
            _dark={{ color: "gray.300" }}
          >
            {article.description}
          </Text>
        )}
        <Text
          fontSize="sm"
          color="gray.500"
          _dark={{ color: "gray.400" }}
        >
          {formatDate(article.date)}
        </Text>
      </Box>
      
      <Box py="lg">
        <Markdown>{article.body}</Markdown>
      </Box>
    </Stack>
  );
}

export default ArticleDetailPage;
