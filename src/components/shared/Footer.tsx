import { Box, Text } from "@yamada-ui/react";

function Footer() {
  return (
    <Box
      as="footer"
      textAlign="center"
      py="lg"
      borderTop="1px solid"
      borderColor="gray.200"
      bg="gray.50"
      _dark={{
        borderColor: "gray.700",
        bg: "gray.900",
      }}
    >
      <Text
        fontSize="sm"
        color="gray.600"
        _dark={{ color: "gray.400" }}
      >
        © 2024 Blog. All rights reserved.
      </Text>
    </Box>
  );
}

export default Footer;
