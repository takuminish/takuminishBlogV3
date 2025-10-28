import type { ScrapDetail, ScrapHead } from "./entity/scrap";
import { getScraps } from "./infra/scraps.repository";

export function getScrapHeads(order?: number): ScrapHead[] {
  const heads = getScraps().map((scrap) => ({
    slug: scrap.slug,
    title: scrap.title,
    date: scrap.date,
  }));

  if(!order) {
    return heads;
  } 

  return heads.slice(0, order);
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
