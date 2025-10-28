import type { ScrapDetail, ScrapHead } from "./entity/scrap";
import { getScraps } from "./infra/scraps.repository";

export function getScrapHeads(): ScrapHead[] {
  return getScraps().map((scrap) => ({
    slug: scrap.slug,
    title: scrap.title,
    date: scrap.date,
  }));
}

export function getScrapDetailBySlug(slug: string): ScrapDetail {
  const scrap = getScrapDetails().find((scrap) => slug === scrap.slug);

  if (!scrap) {
    throw new Error(`scrap not found(slug = ${slug}`);
  }

  return scrap;
}

export function getScrapDetails(): ScrapDetail[] {
  return getScraps();
}
