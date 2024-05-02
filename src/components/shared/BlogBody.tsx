import { css } from "hono/css";
import { Child } from "hono/jsx";

type Props = {
  children: Child;
};

const layoutClass = css`
  min-height: 80vh;
  padding: 0 50px 50px;
  background-color: #edf2f7;
`;

function BlogBody(props: Props) {
  const { children } = props;
  return <div class={layoutClass}>{children}</div>;
}

export default BlogBody;
