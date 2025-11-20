import tokyoHero from "@assets/generated_images/Students_in_Tokyo_hero_366c34fa.png";
import koreaHero from "@assets/generated_images/Students_in_Korea_hero_f1ab5dd2.png";
import studentsHero from "@assets/generated_images/Students_studying_together_hero_65ed8f9a.png";

/**
 * Maps a program image path from the database to a bundled asset.
 * Falls back to a generic classroom photo when no match is found.
 */
export function getProgramImage(imageUrl: string | null | undefined) {
  if (!imageUrl) {
    return studentsHero;
  }

  const normalized = imageUrl.toLowerCase();

  if (normalized.includes("tokyo")) {
    return tokyoHero;
  }

  if (normalized.includes("korea") || normalized.includes("seoul")) {
    return koreaHero;
  }

  return studentsHero;
}
