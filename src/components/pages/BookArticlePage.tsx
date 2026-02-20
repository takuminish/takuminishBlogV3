/** @see docs/system-design/004-component-design.md */
import type {
  BookArticleDetail,
  BookArticleNav,
  BookHead,
} from "@/books/entity/books";
import { Markdown } from "@yamada-ui/markdown";
import { Box, Flex, Heading, Link, Stack, Text } from "@yamada-ui/react";

type Props = {
  book: BookHead;
  article: BookArticleDetail;
  nav: BookArticleNav;
};

/** Book内記事ページ（パンくず＋prev/nextナビ付き） */
function BookArticlePage(props: Props) {
  const { book, article, nav } = props;

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <Stack gap="xl" maxW="800px" mx="auto">
      <Box>
        <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
          <Link
            href={`/books/${book.slug}`}
            color="amber.700"
            fontWeight="500"
            fontFamily="Georgia, 'Times New Roman', serif"
            _hover={{ color: "amber.800" }}
            _dark={{ color: "amber.400", _hover: { color: "amber.300" } }}
          >
            {book.title}
          </Link>
        </Text>
      </Box>

      <Box
        textAlign="center"
        py="xl"
        borderBottom="1px solid"
        borderColor="gray.200"
        _dark={{ borderColor: "gray.700" }}
      >
        <Heading
          size="3xl"
          color="gray.800"
          fontWeight="700"
          fontFamily="Georgia, 'Times New Roman', serif"
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
        <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
          {formatDate(article.date)}
        </Text>
      </Box>

      <Box py="lg">
        <Markdown>{article.body}</Markdown>
      </Box>

      <Box
        borderTop="1px solid"
        borderColor="gray.200"
        pt="lg"
        _dark={{ borderColor: "gray.700" }}
      >
        <Flex justify="space-between" align="center">
          <Box>
            {nav.prev && (
              <Link
                href={`/books/${book.slug}/articles/${nav.prev.slug}`}
                color="amber.700"
                _hover={{ color: "amber.800" }}
                _dark={{
                  color: "amber.400",
                  _hover: { color: "amber.300" },
                }}
              >
                &larr; {nav.prev.title}
              </Link>
            )}
          </Box>
          <Box>
            {nav.next && (
              <Link
                href={`/books/${book.slug}/articles/${nav.next.slug}`}
                color="amber.700"
                _hover={{ color: "amber.800" }}
                _dark={{
                  color: "amber.400",
                  _hover: { color: "amber.300" },
                }}
              >
                {nav.next.title} &rarr;
              </Link>
            )}
          </Box>
        </Flex>
      </Box>
    </Stack>
  );
}

export default BookArticlePage;
