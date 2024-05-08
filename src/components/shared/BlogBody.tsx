import { Box } from "@yamada-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function BlogBody(props: Props) {
  const { children } = props;
  return (
    <Box
      maxW={{ base: "1024px" }}
      padding={{ base: "2rem" }}
      minHeight='85vh'
    >
      {children}
    </Box>
  );
}

export default BlogBody;
