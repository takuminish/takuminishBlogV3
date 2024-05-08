import { reactRenderer } from "@hono/react-renderer";
import Footer from "./components/shared/Footer";
import BlogBody from "./components/shared/BlogBody";
import { Flex, UIProvider } from "@yamada-ui/react";

export const renderer = reactRenderer(({ children, title }) => {
  return (
    <html>
      <head>
        <title>{title}</title>
      </head>
      <body>
        <UIProvider>
          <Flex justifyContent="center">
            <BlogBody>{children}</BlogBody>
          </Flex>
          <Footer />
        </UIProvider>
      </body>
    </html>
  );
});
