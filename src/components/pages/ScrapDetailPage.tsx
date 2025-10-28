import type { ScrapDetail } from "@/scraps/entity/scrap";
import { Markdown } from "@yamada-ui/markdown";
import { Box, Center, Heading } from "@yamada-ui/react";

type Props = {
  scrap: ScrapDetail;
};

function ScrapDetailPage(props: Props) {
  const { scrap } = props;

  return (
    <>
      <Box>
        <Heading bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
          <Center>{scrap.title}</Center>
        </Heading>
        <Center>投稿日: {scrap.date.toISOString()}</Center>
      </Box>
      <Markdown>{scrap.body}</Markdown>
    </>
  );
}

export default ScrapDetailPage;
