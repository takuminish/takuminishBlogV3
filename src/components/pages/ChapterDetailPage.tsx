/** @see docs/system-design/004-component-design.md */
import type { BookDetail, ChapterDetail } from "@/books/entity/books";
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
  chapter: ChapterDetail;
};

/** Chapter詳細ページ */
function ChapterDetailPage(props: Props) {
  const { book, chapter } = props;

  return (
    <Stack gap="xl" maxW="800px" mx="auto">
      <Box textAlign="center" py="xl">
        <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
          <Link
            href={`/books/${book.slug}`}
            color="blue.600"
            _hover={{ color: "blue.700" }}
            _dark={{ color: "blue.400", _hover: { color: "blue.300" } }}
          >
            {book.title}
          </Link>
        </Text>
        <Heading
          size="3xl"
          color="gray.800"
          fontWeight="700"
          mt="sm"
          mb="md"
          lineHeight="1.2"
          _dark={{ color: "gray.100" }}
        >
          {chapter.title}
        </Heading>
        {chapter.description && (
          <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.300" }}>
            {chapter.description}
          </Text>
        )}
      </Box>

      <Box>
        <Heading
          size="xl"
          color="gray.700"
          fontWeight="600"
          mb="lg"
          _dark={{ color: "gray.200" }}
        >
          記事一覧
        </Heading>
        <List>
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
    </Stack>
  );
}

export default ChapterDetailPage;
