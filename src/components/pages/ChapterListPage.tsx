/** @see docs/system-design/004-component-design.md */
import type { BookDetail } from "@/books/entity/books";
import {
  Box,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from "@yamada-ui/react";

type Props = {
  book: BookDetail;
};

/** Chapter一覧ページ */
function ChapterListPage(props: Props) {
  const { book } = props;

  return (
    <Stack gap="xl" maxW="800px" mx="auto">
      <Box textAlign="center" py="lg">
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
          size="2xl"
          color="gray.800"
          fontWeight="700"
          mt="sm"
          _dark={{ color: "gray.100" }}
        >
          チャプター一覧
        </Heading>
      </Box>

      <Stack gap="md">
        {book.chapters.map((chapter) => (
          <LinkBox
            key={chapter.slug}
            as="article"
            p="lg"
            border="1px solid"
            borderColor="border"
            bg="white"
            _hover={{
              borderColor: "gray.300",
              transform: "translateY(-1px)",
              transition: "all 0.2s ease",
            }}
            _dark={{
              bg: "gray.800",
              borderColor: "gray.700",
              _hover: { borderColor: "gray.600" },
            }}
          >
            <LinkOverlay
              href={`/books/${book.slug}/chapters/${chapter.slug}`}
            />
            <Heading
              size="lg"
              color="gray.800"
              mb="sm"
              fontWeight="600"
              _dark={{ color: "gray.100" }}
            >
              {chapter.title}
            </Heading>
            {chapter.description && (
              <Text
                color="gray.600"
                mb="sm"
                lineHeight="1.6"
                _dark={{ color: "gray.300" }}
              >
                {chapter.description}
              </Text>
            )}
            <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
              {chapter.articles.length}記事
            </Text>
          </LinkBox>
        ))}
      </Stack>
    </Stack>
  );
}

export default ChapterListPage;
