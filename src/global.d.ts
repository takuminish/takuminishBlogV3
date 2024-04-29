import {} from 'hono'

declare module 'hono' {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { title?: string }): Response
  }
}

// ref: https://github.com/vfile/vfile-matter?tab=readme-ov-file#types
declare module 'vfile' {
  interface DataMap {
    matter: {
      // `file.data.matter.string` is typed as `string | undefined`.
      title: string | undefined,
      date: Date | undefined,
      description: string | undefined;

    }
  }
}
