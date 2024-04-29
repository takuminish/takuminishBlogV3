import { Hono } from "hono";
import { renderer } from "./renderer";
import { ssgParams } from "hono/ssg";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  return c.render(<h1>Hello!</h1>, { title: "takuminishのブログ" });
});

app.get(
  "/articles/:id",
  ssgParams(() => [1, 2, 3, 4, 5].map((id) => ({ id: `${id}` }))),
  (c) => {
    const id = c.req.param('id');
    return c.render(<h1>Hello! id {id}</h1>, { title: "takuminishのブログ" });
  }
);

export default app;
