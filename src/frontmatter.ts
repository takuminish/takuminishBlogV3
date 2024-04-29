// ref: https://github.com/remarkjs/remark-frontmatter
/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('vfile').VFile} VFile
 */

import { VFile } from "vfile";
import { matter } from "vfile-matter";

/**
 * Parse YAML frontmatter and expose it at `file.data.matter`.
 *
 * @returns
 *   Transform.
 */
export default function customParseFrontMatter() {
  /**
   * Transform.
   *
   * @param {Node} tree
   *   Tree.
   * @param {VFile} file
   *   File.
   * @returns {undefined}
   *   Nothing.
   */
  return function (_: any, file: VFile) {
    matter(file);
  };
}
