import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function BlogBody(props: Props) {
  const { children } = props;
  return <div>{children}</div>;
}

export default BlogBody;
