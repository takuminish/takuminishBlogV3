import type { ScrapDetail } from "@/scraps/entity/scrap";
import { Markdown } from "@yamada-ui/markdown";
import { Box, Heading, Stack, Text } from "@yamada-ui/react";

type Props = {
  scrap: ScrapDetail;
};

function ScrapDetailPage(props: Props) {
  const { scrap } = props;

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <Stack gap="xl" maxW="800px" mx="auto">
      <Box textAlign="center" py="xl" borderBottom="1px solid" borderColor="gray.200" _dark={{ borderColor: "gray.700" }}>
        <Heading
          size="3xl"
          color="gray.800"
          fontWeight="700"
          mb="md"
          lineHeight="1.2"
          _dark={{ color: "gray.100" }}
        >
          {scrap.title}
        </Heading>
        <Text
          fontSize="sm"
          color="gray.500"
          _dark={{ color: "gray.400" }}
        >
          {formatDate(scrap.date)}
        </Text>
      </Box>
      
      <Box py="lg">
        <Markdown>{scrap.body}</Markdown>
      </Box>
    </Stack>
  );
}

export default ScrapDetailPage;
