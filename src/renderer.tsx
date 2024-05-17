import { reactRenderer } from "@hono/react-renderer";
import Footer from "./components/shared/Footer";
import BlogBody from "./components/shared/BlogBody";
import { Flex, UIProvider } from "@yamada-ui/react";

export const renderer = reactRenderer(
  ({ children, title, description, ogImagePath }) => {
    console.log(title);
    return (
      <html lang="ja">
        <head>
          <meta charSet="utf8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta property="og:locale" content="ja_JP" />
          <meta property="og:site_name" content="takuminishのブログ" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          {ogImagePath && (
            <meta
              property="og:image"
              content={new URL(
                ogImagePath,
                "https://takuminish.pages.dev"
              ).toString()}
            />
          )}

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="takuminish" />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:title" content={title} />
          <title>{`${title} | takuminishのブログ`}</title>
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
  }
);
