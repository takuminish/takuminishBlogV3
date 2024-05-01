import { css, Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";

const bodyClass = css`
  padding: 0 50px;
  margin: 0;
  background-color: #edf2f7;
`;

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html>
      <head>
        <Style />
        <title>{title}</title>
      </head>
      <body class={bodyClass}>{children}</body>
    </html>
  );
});
