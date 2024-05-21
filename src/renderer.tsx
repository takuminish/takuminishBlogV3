import { reactRenderer } from "@hono/react-renderer";
import { Flex, UIProvider } from "@yamada-ui/react";
import BlogBody from "@/components/shared/BlogBody";
import Footer from "@/components/shared/Footer";
import { BLOG_TITLE, BLOG_URL } from "@/constants";

export const renderer = reactRenderer(
  ({ children, title, description, ogImagePath }) => {
    return (
      <html lang="ja">
        <head>
          <meta charSet="utf8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta property="og:locale" content="ja_JP" />
          <meta property="og:site_name" content={BLOG_TITLE} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          {ogImagePath && (
            <meta
              property="og:image"
              content={new URL(ogImagePath, BLOG_URL).toString()}
            />
          )}

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="takuminish" />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:title" content={title} />
          <title>{`${title} | ${BLOG_TITLE}`}</title>
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
  },
);
