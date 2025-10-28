import { Box, VStack } from "@yamada-ui/react";
import type { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

function BlogBody(props: Props) {
  const { children } = props;
  return (
    <VStack gap={0} minH="100vh">
      <Header />
      <Box 
        as="main" 
        w="full" 
        maxW="1024px" 
        mx="auto" 
        p="2rem" 
        flex="1"
      >
        {children}
      </Box>
    </VStack>
  );
}

export default BlogBody;
