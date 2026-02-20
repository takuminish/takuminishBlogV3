/** @see docs/system-design/004-component-design.md */
import type { BookHead } from "@/books/entity/books";
import BookCard from "@/components/shared/BookCard";
import { Box, Heading, Stack } from "@yamada-ui/react";

type Props = {
  books: BookHead[];
};

/** Book一覧ページ */
function BookIndexPage(props: Props) {
  const { books } = props;

  return (
    <Stack gap="xl" maxW="800px" mx="auto">
      <Box textAlign="center" py="lg">
        <Heading
          size="2xl"
          color="gray.800"
          fontWeight="700"
          fontFamily="Georgia, 'Times New Roman', serif"
          _dark={{ color: "gray.100" }}
        >
          Book一覧
        </Heading>
      </Box>

      <Stack gap="md">
        {books.map((book) => (
          <BookCard
            key={book.slug}
            title={book.title}
            description={book.description}
            date={book.date}
            href={generateBookUrl(book.slug)}
            articleCount={book.articleCount}
          />
        ))}
      </Stack>
    </Stack>
  );
}

function generateBookUrl(slug: string): string {
  return `books/${slug}`;
}

export default BookIndexPage;
