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
          size="2xl"
          color="gray.800"
          fontWeight="700"
          fontFamily="Georgia, 'Times New Roman', serif"
          mt="sm"
          _dark={{ color: "gray.100" }}
        >
          チャプター一覧
        </Heading>
      </Box>

      <Stack gap="md">
        {book.chapters.map((chapter, index) => (
          <LinkBox
            key={chapter.slug}
            as="article"
            p="lg"
            pl="calc(8px + 1rem)"
            border="1px solid"
            borderColor="border"
            bg="white"
            position="relative"
            transition="all 0.2s ease"
            _hover={{
              borderColor: "gray.300",
              transform: "translateY(-1px)",
            }}
            _before={{
              content: '""',
              position: "absolute",
              top: "0",
              left: "0",
              bottom: "0",
              width: "8px",
              bg: "amber.600",
            }}
            _dark={{
              bg: "gray.800",
              borderColor: "gray.700",
              _hover: { borderColor: "gray.600" },
              _before: { bg: "amber.500" },
            }}
          >
            <LinkOverlay
              href={`/books/${book.slug}/chapters/${chapter.slug}`}
            />
            <Box display="flex" alignItems="center" gap="sm" mb="sm">
              <Text
                fontSize="xs"
                fontWeight="700"
                color="white"
                bg="amber.600"
                px="sm"
                py="2px"
                borderRadius="full"
                _dark={{ bg: "amber.500" }}
              >
                第{index + 1}章
              </Text>
            </Box>
            <Heading
              size="lg"
              color="gray.800"
              mb="sm"
              fontWeight="600"
              fontFamily="Georgia, 'Times New Roman', serif"
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
            <Text
              fontSize="sm"
              color="amber.700"
              fontWeight="500"
              _dark={{ color: "amber.400" }}
            >
              {chapter.articles.length}記事
            </Text>
          </LinkBox>
        ))}
      </Stack>
    </Stack>
  );
}

export default ChapterListPage;
