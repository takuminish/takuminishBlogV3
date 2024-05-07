import { reactRenderer } from '@hono/react-renderer'
import Footer from "./components/shared/Footer";
import BlogBody from "./components/shared/BlogBody";

export const renderer = reactRenderer(({ children, title }) => {
  return (
    <html>
      <head>
        <title>{title}</title>
      </head>
      <body>
        <BlogBody>{children}</BlogBody>
        <Footer />
      </body>
    </html>
  );
});
