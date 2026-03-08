import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

test("baseline directories and runtime pin exist", () => {
  const requiredPaths = [
    ".nvmrc",
    "src/pages/[locale]",
    "src/content",
    "src/lib/graph",
    "src/config",
    "scripts/validation",
    "tests",
  ];

  for (const requiredPath of requiredPaths) {
    assert.equal(existsSync(requiredPath), true, `missing ${requiredPath}`);
  }

  const nvmrc = readFileSync(".nvmrc", "utf-8").trim();
  assert.equal(nvmrc, "24");
});

test("root route enforces locale-first entry", () => {
  const rootRoute = readFileSync("src/pages/index.astro", "utf-8");
  assert.match(rootRoute, /Astro\.redirect\(/);
});

test("locale config is centralized and reused in locale route", () => {
  assert.equal(existsSync("src/config/locales.ts"), true, "missing src/config/locales.ts");

  const localeRoute = readFileSync("src/pages/[locale]/index.astro", "utf-8");
  assert.match(localeRoute, /from "..\/..\/config\/locales"/);
  assert.ok(!localeRoute.includes('["en", "pt-br"]'), "hardcoded locale list must be removed");
});

test("layout does not reference missing favicon.ico", () => {
  const layout = readFileSync("src/layouts/Layout.astro", "utf-8");
  assert.ok(!layout.includes("/favicon.ico"));
});
