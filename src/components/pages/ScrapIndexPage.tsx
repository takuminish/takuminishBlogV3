import type { ScrapHead } from "@/scraps/entity/scrap";
import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from "@yamada-ui/react";

type Props = {
  scraps: ScrapHead[];
};

function ScrapIndexPage(props: Props) {
  const { scraps } = props;

  const scrapContents = scraps.map((scrap) => {
    return (
      <LinkBox
        key={scrap.slug}
        as="article"
        maxW={{ base: "100%" }}
        rounded="md"
        p="md"
        border="1px solid"
        borderColor="inherit"
        boxShadow="md"
      >
        <LinkOverlay href={generateScrapUrl(scrap.slug)} />
        <Heading
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          size="md"
        >
          {" "}
          {scrap.title}
        </Heading>
        <Text>投稿日: {scrap.date.toISOString()}</Text>
      </LinkBox>
    );
  });

  return (
    <Flex direction="column" justifyContent="center">
      <Box>
        <Heading>スクラップ一覧</Heading>
      </Box>
      <Flex gap="md" direction="column">
        {scrapContents}
      </Flex>
    </Flex>
  );
}

function generateScrapUrl(slug: string): string {
  return `scraps/${slug}`;
}

export default ScrapIndexPage;
