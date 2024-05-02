import { css } from "hono/css";

const footerClass = css`
  height: 100px;
`;

function Footer() {
  return <footer class={footerClass}></footer>;
}

export default Footer;
