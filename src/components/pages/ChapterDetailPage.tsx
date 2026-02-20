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
      <Box
        textAlign="center"
        py="xl"
        borderBottom="1px solid"
        borderColor="gray.200"
        _dark={{ borderColor: "gray.700" }}
      >
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
        <Heading
          size="3xl"
          color="gray.800"
          fontWeight="700"
          fontFamily="Georgia, 'Times New Roman', serif"
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
          fontFamily="Georgia, 'Times New Roman', serif"
          mb="lg"
          _dark={{ color: "gray.200" }}
        >
          記事一覧
        </Heading>
        <List styleType="none">
          {chapter.articles.map((article, index) => (
            <ListItem
              key={article.slug}
              py="xs"
              display="flex"
              alignItems="center"
              gap="sm"
            >
              <Text
                as="span"
                fontSize="sm"
                color="gray.400"
                fontFamily="monospace"
                minW="2em"
                textAlign="right"
                _dark={{ color: "gray.500" }}
              >
                {index + 1}.
              </Text>
              <Link
                href={`/books/${book.slug}/articles/${article.slug}`}
                color="gray.700"
                _hover={{ color: "amber.700" }}
                _dark={{
                  color: "gray.300",
                  _hover: { color: "amber.400" },
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
