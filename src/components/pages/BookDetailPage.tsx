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

  /** 章なし構成の記事にグローバル連番を付与 */
  const getArticleNumber = (index: number): number => index + 1;

  /** 章あり構成の記事に章をまたいだグローバル連番を付与 */
  const getChapterArticleOffset = (chapterIndex: number): number => {
    let offset = 0;
    for (let i = 0; i < chapterIndex; i++) {
      offset += book.chapters[i].articles.length;
    }
    return offset;
  };

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
          fontFamily="Georgia, 'Times New Roman', serif"
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
          fontFamily="Georgia, 'Times New Roman', serif"
          mb="lg"
          _dark={{ color: "gray.200" }}
        >
          目次
        </Heading>

        {hasChapters ? (
          <Stack gap="lg">
            {book.chapters.map((chapter, chapterIndex) => (
              <Box
                key={chapter.slug}
                pl="md"
                borderLeft="3px solid"
                borderColor="amber.400"
                _dark={{ borderColor: "amber.500" }}
              >
                <Heading
                  size="md"
                  color="gray.700"
                  fontWeight="600"
                  fontFamily="Georgia, 'Times New Roman', serif"
                  mb="sm"
                  _dark={{ color: "gray.200" }}
                >
                  <Text
                    as="span"
                    color="amber.600"
                    mr="sm"
                    fontSize="sm"
                    fontFamily="sans-serif"
                    _dark={{ color: "amber.400" }}
                  >
                    第{chapterIndex + 1}章
                  </Text>
                  <Link
                    href={`/books/${book.slug}/chapters/${chapter.slug}`}
                    color="gray.700"
                    _hover={{ color: "amber.700" }}
                    _dark={{
                      color: "gray.200",
                      _hover: { color: "amber.400" },
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
                <List pl="md" styleType="none">
                  {chapter.articles.map((article, articleIndex) => (
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
                        {getChapterArticleOffset(chapterIndex) +
                          articleIndex +
                          1}
                        .
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
            ))}
          </Stack>
        ) : (
          <List styleType="none">
            {book.articles.map((article, index) => (
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
                  {getArticleNumber(index)}.
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
        )}
      </Box>
    </Stack>
  );
}

export default BookDetailPage;
