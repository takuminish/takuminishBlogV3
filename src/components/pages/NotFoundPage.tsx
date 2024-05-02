import { css } from "hono/css";

const titleClass = css`
  text-align: center;
  display: grid;
  place-content: center;
`;

function NotFoundPage() {
  return (
    <div class={titleClass}>
      <h1>404 NotFound. 記事が見つかりません</h1>
    </div>
  );
}

export default NotFoundPage;
