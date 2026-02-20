/** @see docs/system-design/004-component-design.md */
import type { BookDetail } from "@/books/entity/books";
import { Markdown } from "@yamada-ui/markdown";
import {
  Box,
  Heading,
  Link,
  List,
  ListItem,
  Stack,
  Text,
} from "@yamada-ui/react";

type Props = {
  book: BookDetail;
};

/** Book詳細ページ（目次を含む） */
function BookDetailPage(props: Props) {
  const { book } = props;

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const hasChapters = book.chapters.length > 0;

  return (
    <Stack gap="xl" maxW="800px" mx="auto">
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
          mb="md"
          lineHeight="1.2"
          _dark={{ color: "gray.100" }}
        >
          {book.title}
        </Heading>
        {book.description && (
          <Text
            fontSize="lg"
            color="gray.600"
            mb="sm"
            _dark={{ color: "gray.300" }}
          >
            {book.description}
          </Text>
        )}
        <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
          {formatDate(book.date)}
        </Text>
      </Box>

      {book.body && (
        <Box py="md">
          <Markdown>{book.body}</Markdown>
        </Box>
      )}

      <Box>
        <Heading
          size="xl"
          color="gray.700"
          fontWeight="600"
          mb="lg"
          _dark={{ color: "gray.200" }}
        >
          目次
        </Heading>

        {hasChapters ? (
          <Stack gap="lg">
            {book.chapters.map((chapter) => (
              <Box key={chapter.slug}>
                <Heading
                  size="md"
                  color="gray.700"
                  fontWeight="600"
                  mb="sm"
                  _dark={{ color: "gray.200" }}
                >
                  <Link
                    href={`/books/${book.slug}/chapters/${chapter.slug}`}
                    color="blue.600"
                    _hover={{ color: "blue.700" }}
                    _dark={{
                      color: "blue.400",
                      _hover: { color: "blue.300" },
                    }}
                  >
                    {chapter.title}
                  </Link>
                </Heading>
                {chapter.description && (
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    mb="sm"
                    _dark={{ color: "gray.400" }}
                  >
                    {chapter.description}
                  </Text>
                )}
                <List pl="md">
                  {chapter.articles.map((article) => (
                    <ListItem key={article.slug}>
                      <Link
                        href={`/books/${book.slug}/articles/${article.slug}`}
                        color="gray.700"
                        _hover={{ color: "blue.600" }}
                        _dark={{
                          color: "gray.300",
                          _hover: { color: "blue.400" },
                        }}
                      >
                        {article.title}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Stack>
        ) : (
          <List>
            {book.articles.map((article) => (
              <ListItem key={article.slug}>
                <Link
                  href={`/books/${book.slug}/articles/${article.slug}`}
                  color="gray.700"
                  _hover={{ color: "blue.600" }}
                  _dark={{
                    color: "gray.300",
                    _hover: { color: "blue.400" },
                  }}
                >
                  {article.title}
                </Link>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Stack>
  );
}

export default BookDetailPage;
