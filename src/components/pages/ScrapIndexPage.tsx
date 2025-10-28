import type { ScrapHead } from "@/scraps/entity/scrap";
import ArticleCard from "@/components/shared/ArticleCard";
import {
  Box,
  Heading,
  Stack,
} from "@yamada-ui/react";

type Props = {
  scraps: ScrapHead[];
};

function ScrapIndexPage(props: Props) {
  const { scraps } = props;

  return (
    <Stack gap="xl" maxW="800px" mx="auto">
      <Box textAlign="center" py="lg">
        <Heading
          size="2xl"
          color="gray.800"
          fontWeight="700"
          _dark={{ color: "gray.100" }}
        >
          スクラップ一覧
        </Heading>
      </Box>

      <Stack gap="md">
        {scraps.map((scrap) => (
          <ArticleCard
            key={scrap.slug}
            title={scrap.title}
            date={scrap.date}
            href={generateScrapUrl(scrap.slug)}
          />
        ))}
      </Stack>
    </Stack>
  );
}

function generateScrapUrl(slug: string): string {
  return `scraps/${slug}`;
}

export default ScrapIndexPage;
