import {} from 'hono'

declare module '@hono/react-renderer' {
  interface Props {
    title: string,
    description: string,
    ogImagePath?: string,
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
