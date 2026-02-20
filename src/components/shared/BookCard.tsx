/** @see docs/system-design/004-component-design.md */
import { Box, Heading, LinkBox, LinkOverlay, Text } from "@yamada-ui/react";

type Props = {
  title: string;
  description?: string;
  date: Date;
  href: string;
  articleCount: number;
};

/** Book一覧のカードコンポーネント */
function BookCard(props: Props) {
  const { title, description, date, href, articleCount } = props;

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <LinkBox
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
        _hover: {
          borderColor: "gray.600",
        },
      }}
    >
      <LinkOverlay href={href} />
      <Heading
        size="lg"
        color="gray.800"
        mb="sm"
        fontWeight="600"
        _dark={{ color: "gray.100" }}
      >
        {title}
      </Heading>
      {description && (
        <Text
          color="gray.600"
          mb="sm"
          lineHeight="1.6"
          _dark={{ color: "gray.300" }}
        >
          {description}
        </Text>
      )}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
          {formatDate(date)}
        </Text>
        <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
          {articleCount}記事
        </Text>
      </Box>
    </LinkBox>
  );
}

export default BookCard;
