import fs from "node:fs";
import path from "node:path";
import { SCRAP_FILE_PATH } from "@/constants";
import matter from "gray-matter";
import type { ScrapDetail } from "../entity/scrap";

const scrapsFile = fs.readdirSync(SCRAP_FILE_PATH);

const scraps = await (() => {
  return Promise.all(
    scrapsFile.map(async (file) => {
      const filePath = path.join(SCRAP_FILE_PATH, file);

      const {
        data: { title, date },
        content,
      } = matter.read(filePath);

      const slug = path.parse(path.basename(filePath)).name;

      const scrap: ScrapDetail = {
        slug,
        title,
        date: new Date(date),
        body: content,
      };
      return scrap;
    }),
  );
})();

export function getScraps(): ScrapDetail[] {
  return scraps;
}
