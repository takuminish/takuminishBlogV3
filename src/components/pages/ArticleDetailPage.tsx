import { Markdown } from "@yamada-ui/markdown";
import { Box, Center, Heading } from "@yamada-ui/react";
import type { ArticleDetail } from "../../articles/entity/articles";

type Props = {
	article: ArticleDetail;
};

function ArticleDetailPage(props: Props) {
	const { article } = props;

	return (
		<>
			<Box>
				<Heading bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
					<Center>{article.title}</Center>
				</Heading>
				<Center>{article.description}</Center>
				<Center>投稿日: {article.date.toISOString()}</Center>
			</Box>
			<Markdown>{article.body}</Markdown>
		</>
	);
}

export default ArticleDetailPage;
