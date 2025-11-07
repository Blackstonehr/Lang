import { test, expect } from "@playwright/test";

const BASE_URL = process.env.SITE_URL ?? "https://langtwo.vercel.app";
const DEFAULT_PROGRAM_SLUG = process.env.PROGRAM_SLUG ?? "tokyo-youth";

test.setTimeout(60_000);

test("homepage: has meta description and JSON-LD", async ({ page }) => {
  const response = await page.goto(BASE_URL, {
    waitUntil: "domcontentloaded",
  });

  expect(response?.ok()).toBeTruthy();

  const description = await page
    .locator('head meta[name="description"]')
    .first()
    .getAttribute("content");
  expect(description && description.length > 0).toBeTruthy();

  const jsonLd = await page.evaluate(() => {
    const script = document.querySelector(
      'script[type="application/ld+json"]',
    );
    return script?.textContent ?? "";
  });

  expect(jsonLd.length).toBeGreaterThan(0);
});

test("program page: surface canonical hints when available", async ({
  page,
}) => {
  const programUrl = `${BASE_URL}/programs/${DEFAULT_PROGRAM_SLUG}`;
  const response = await page.goto(programUrl, {
    waitUntil: "domcontentloaded",
  });

  if (!response || !response.ok()) {
    test.info().annotations.push({
      type: "info",
      description: `Program page unavailable (status: ${response?.status() ?? "unknown"})`,
    });
    return;
  }

  const canonical = await page
    .locator('head link[rel="canonical"]')
    .first()
    .getAttribute("href");
  expect.soft(canonical).toBeTruthy();

  const hasStructuredData = await page.evaluate(() => {
    const nodes = Array.from(
      document.querySelectorAll('script[type="application/ld+json"]'),
    )
      .map((node) => node.textContent ?? "")
      .join("\n");
    return /"@type"\s*:\s*"(FAQPage|Course|EducationalOrganization)"/i.test(
      nodes,
    );
  });

  expect.soft(hasStructuredData).toBeTruthy();
});

