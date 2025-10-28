import { Box, Flex, Heading, Link } from "@yamada-ui/react";

function Header() {
  return (
    <Box
      as="header"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={1000}
      _dark={{
        bg: "gray.800",
        borderColor: "gray.700",
      }}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px="lg"
        py="md"
        align="center"
        justify="space-between"
      >
        <Link href="/" _hover={{ textDecoration: "none" }}>
          <Heading
            size="lg"
            color="gray.800"
            fontWeight="700"
            _dark={{ color: "gray.100" }}
          >
            Blog
          </Heading>
        </Link>

        <Flex gap="md" align="center">
          <Link
            href="/articles"
            color="gray.600"
            fontWeight="500"
            _hover={{ color: "blue.600" }}
            _dark={{
              color: "gray.300",
              _hover: { color: "blue.400" },
            }}
          >
            記事
          </Link>
          <Link
            href="/scraps"
            color="gray.600"
            fontWeight="500"
            fontFamily="'Comic Sans MS', cursive, sans-serif"
            _hover={{ color: "orange.600" }}
            _dark={{
              color: "gray.300",
              _hover: { color: "orange.400" },
            }}
          >
            スクラップ
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
