import { Box, Heading, LinkBox, LinkOverlay, Text } from "@yamada-ui/react";

type Props = {
  title: string;
  date: Date;
  href: string;
  index?: number;
};

function ScrapCard(props: Props) {
  const { title, date, href, index = 0 } = props;

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // ランダムな色とローテーション
  const colors = [
    { bg: "#fff3cd", border: "#ffeaa7", shadow: "#fdcb6e" },
    { bg: "#d1ecf1", border: "#bee5eb", shadow: "#74b9ff" },
    { bg: "#d4edda", border: "#c3e6cb", shadow: "#55a3ff" },
    { bg: "#f8d7da", border: "#f5c6cb", shadow: "#fd79a8" },
    { bg: "#e2e3e5", border: "#d6d8db", shadow: "#a29bfe" },
  ];

  const rotations = [
    "rotate(-2deg)",
    "rotate(1deg)",
    "rotate(-1deg)",
    "rotate(2deg)",
    "rotate(0deg)",
  ];

  const colorIndex = index % colors.length;
  const rotationIndex = index % rotations.length;
  const selectedColor = colors[colorIndex];
  const rotation = rotations[rotationIndex];

  return (
    <LinkBox
      as="article"
      p="lg"
      bg={selectedColor.bg}
      border="1px solid"
      borderColor={selectedColor.border}
      borderRadius="sm"
      transform={rotation}
      boxShadow={`4px 4px 8px ${selectedColor.shadow}40`}
      position="relative"
      _hover={{
        transform: `${rotation} scale(1.02)`,
        boxShadow: `6px 6px 12px ${selectedColor.shadow}60`,
        transition: "all 0.2s ease",
        zIndex: 10,
      }}
      _before={{
        content: '""',
        position: "absolute",
        top: "8px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "20px",
        height: "20px",
        bg: "rgba(255,255,255,0.6)",
        borderRadius: "50%",
        border: "1px solid rgba(0,0,0,0.1)",
      }}
      _after={{
        content: '""',
        position: "absolute",
        top: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "12px",
        height: "12px",
        bg: "rgba(0,0,0,0.1)",
        borderRadius: "50%",
      }}
      cursor="pointer"
    >
      <LinkOverlay href={href} />

      <Box pt="md">
        <Heading
          size="md"
          color="gray.800"
          mb="sm"
          fontWeight="600"
          fontFamily="'Comic Sans MS', cursive, sans-serif"
          lineHeight="1.3"
        >
          {title}
        </Heading>

        <Text
          fontSize="xs"
          color="gray.600"
          fontWeight="500"
          textAlign="right"
          fontFamily="monospace"
        >
          {formatDate(date)}
        </Text>
      </Box>
    </LinkBox>
  );
}

export default ScrapCard;
