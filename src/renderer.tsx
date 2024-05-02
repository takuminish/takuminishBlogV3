import { css, Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import Footer from "./components/shared/Footer";
import BlogBody from "./components/shared/BlogBody";

const bodyClass = css`
  margin: 0;
`;

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html>
      <head>
        <Style />
        <title>{title}</title>
      </head>
      <body class={bodyClass}>
        <BlogBody>{children}</BlogBody>
        <Footer />
      </body>
    </html>
  );
});
