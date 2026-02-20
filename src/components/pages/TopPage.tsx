import type { ArticleHead } from "@/articles/entity/articles";
import type { BookHead } from "@/books/entity/books";
import ArticleCard from "@/components/shared/ArticleCard";
import ScrapCard from "@/components/shared/ScrapCard";
import type { ScrapHead } from "@/scraps/entity/scrap";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from "@yamada-ui/react";

type Props = {
  articles: ArticleHead[];
  scraps: ScrapHead[];
  books: BookHead[];
};

function TopPage(props: Props) {
  const { articles, scraps, books } = props;

  return (
    <Stack gap="xl">
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

      {books.length > 0 && (
        <Box>
          <Flex justify="space-between" align="center" mb="lg">
            <Heading
              size="xl"
              color="gray.700"
              fontWeight="600"
              fontFamily="Georgia, 'Times New Roman', serif"
              _dark={{ color: "gray.200" }}
            >
              最新のBook
            </Heading>
            <Link
              href="/books"
              color="amber.700"
              fontWeight="500"
              _hover={{ color: "amber.800" }}
              _dark={{ color: "amber.400", _hover: { color: "amber.300" } }}
            >
              すべて見る
            </Link>
          </Flex>
          <Flex gap="lg" justify="center" align="flex-end" flexWrap="wrap">
            {books.map((book, index) => (
              <BookCover
                key={book.slug}
                title={book.title}
                articleCount={book.articleCount}
                href={generateBookUrl(book.slug)}
                index={index}
              />
            ))}
          </Flex>
        </Box>
      )}

      <Box>
        <Flex justify="space-between" align="center" mb="lg">
          <Heading
            size="xl"
            color="gray.700"
            fontWeight="600"
            fontFamily="'Comic Sans MS', cursive, sans-serif"
            _dark={{ color: "gray.200" }}
          >
            最新のスクラップ
          </Heading>
          <Link
            href="/scraps"
            color="orange.600"
            fontWeight="500"
            _hover={{ color: "orange.700" }}
            _dark={{ color: "orange.400", _hover: { color: "orange.300" } }}
          >
            もっと見る
          </Link>
        </Flex>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap="md"
          placeItems="center"
        >
          {scraps.slice(0, 6).map((scrap, index) => (
            <ScrapCard
              key={scrap.slug}
              title={scrap.title}
              date={scrap.date}
              href={generateScrapUrl(scrap.slug)}
              index={index}
            />
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}

/** TopPage用の本の表紙コンポーネント（サイトの暖色トーンに統一） */
function BookCover(props: {
  title: string;
  articleCount: number;
  href: string;
  index: number;
}) {
  const { title, articleCount, href, index } = props;

  /**
   * WHY: サイト全体のデザイントーン（orange.50 / amber系）に
   * 馴染む暖色・ニュートラル系の配色で本ごとにバリエーションを出す
   */
  const coverStyles = [
    { bg: "orange.100", spine: "amber.600", border: "orange.200" },
    { bg: "amber.100", spine: "amber.700", border: "amber.200" },
    { bg: "yellow.100", spine: "yellow.700", border: "yellow.200" },
    { bg: "orange.200", spine: "orange.600", border: "orange.300" },
  ];
  const style = coverStyles[index % coverStyles.length];

  return (
    <LinkBox
      w="180px"
      minH="240px"
      position="relative"
      cursor="pointer"
      transition="transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: "translateY(-6px)",
      }}
    >
      <LinkOverlay href={href} />
      {/* 背表紙 */}
      <Box
        position="absolute"
        top="0"
        left="0"
        bottom="0"
        w="10px"
        bg={style.spine}
        borderLeftRadius="sm"
        _dark={{ bg: "amber.500" }}
      />
      {/* 表紙 */}
      <Box
        ml="8px"
        h="full"
        minH="240px"
        bg={style.bg}
        border="1px solid"
        borderColor={style.border}
        borderLeft="none"
        borderRightRadius="md"
        p="md"
        pl="sm"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        boxShadow="2px 3px 8px rgba(0, 0, 0, 0.08)"
        transition="box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{
          boxShadow: "3px 5px 14px rgba(0, 0, 0, 0.12)",
        }}
        _dark={{
          bg: "gray.800",
          borderColor: "gray.600",
          boxShadow: "2px 3px 8px rgba(0, 0, 0, 0.3)",
          _hover: {
            boxShadow: "3px 5px 14px rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        {/* 上部の装飾ライン */}
        <Box
          borderBottom="1px solid"
          borderColor={style.spine}
          pb="xs"
          mb="sm"
          _dark={{ borderColor: "amber.500" }}
        >
          <Text
            fontSize="2xs"
            color="amber.700"
            textAlign="center"
            fontFamily="Georgia, 'Times New Roman', serif"
            letterSpacing="0.15em"
            _dark={{ color: "amber.400" }}
          >
            BOOK
          </Text>
        </Box>
        {/* タイトル */}
        <Heading
          size="sm"
          color="gray.800"
          fontWeight="700"
          fontFamily="Georgia, 'Times New Roman', serif"
          lineHeight="1.4"
          flex="1"
          display="flex"
          alignItems="center"
          textAlign="center"
          _dark={{ color: "gray.100" }}
        >
          {title}
        </Heading>
        {/* 記事数 */}
        <Text
          fontSize="2xs"
          color="amber.700"
          textAlign="center"
          mt="sm"
          fontWeight="500"
          _dark={{ color: "amber.400" }}
        >
          {articleCount}記事
        </Text>
      </Box>
    </LinkBox>
  );
}

function generateArticleUrl(slug: string): string {
  return `articles/${slug}`;
}

function generateBookUrl(slug: string): string {
  return `books/${slug}`;
}

function generateScrapUrl(slug: string): string {
  return `scraps/${slug}`;
}

export default TopPage;
