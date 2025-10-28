import ScrapCard from "@/components/shared/ScrapCard";
import type { ScrapHead } from "@/scraps/entity/scrap";
import { Box, Grid, Heading } from "@yamada-ui/react";

type Props = {
  scraps: ScrapHead[];
};

function ScrapIndexPage(props: Props) {
  const { scraps } = props;

  return (
    <Box maxW="1000px" mx="auto" p="lg">
      <Box textAlign="center" py="xl" mb="lg">
        <Heading
          size="3xl"
          color="gray.800"
          fontWeight="700"
          fontFamily="'Comic Sans MS', cursive, sans-serif"
          _dark={{ color: "gray.100" }}
        >
          スクラップボード
        </Heading>
      </Box>

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap="lg"
        placeItems="center"
      >
        {scraps.map((scrap, index) => (
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
  );
}

function generateScrapUrl(slug: string): string {
  return `scraps/${slug}`;
}

export default ScrapIndexPage;
