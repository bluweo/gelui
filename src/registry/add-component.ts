/**
 * Add Component CLI — Auto-register orphan primitives
 * Run: npx tsx src/registry/add-component.ts
 *
 * Scans src/primitives/ for .tsx files NOT in registry.json,
 * auto-generates registry entries, and appends them.
 */

import {
  ROOT,
  readRegistry,
  writeRegistry,
  scanPrimitiveFiles,
  inferCategory,
  toKebabCase,
  toDisplayName,
  bold,
  green,
  yellow,
  red,
  cyan,
  dim,
} from "./utils.js";
import { basename } from "path";

// ── Load Current State ──────────────────────────────────────────
const registry = readRegistry();
const existingPaths = new Set(
  registry.components.map((c) => c.path as string)
);
const existingIds = new Set(
  registry.components.map((c) => c.id as string)
);

// ── Scan for Orphans ────────────────────────────────────────────
const scannedFiles = scanPrimitiveFiles();
const orphans = scannedFiles.filter((f) => !existingPaths.has(f.relativePath));

if (orphans.length === 0) {
  console.log(`\n${green("No orphan files found.")} All primitives are already in registry.json.\n`);
  process.exit(0);
}

console.log(`\n${bold("=".repeat(60))}`);
console.log(bold("  ADD COMPONENTS — Orphan Detection"));
console.log(`${bold("=".repeat(60))}\n`);
console.log(`  Found ${yellow(String(orphans.length))} file(s) not in registry:\n`);

// ── Generate Entries ────────────────────────────────────────────
const newEntries: Array<Record<string, unknown>> = [];

for (const orphan of orphans) {
  const filename = basename(orphan.relativePath);
  let id = toKebabCase(filename);

  // Avoid ID collision — append a suffix if needed
  if (existingIds.has(id)) {
    let suffix = 2;
    while (existingIds.has(`${id}-${suffix}`)) suffix++;
    id = `${id}-${suffix}`;
  }

  const name = toDisplayName(filename);
  const category = inferCategory(orphan.relativePath);
  const primaryExport = orphan.exportNames[0] || name.replace(/\s+/g, "");

  const entry: Record<string, unknown> = {
    id,
    name,
    displayName: name,
    description: `${name} component`,
    layer: "primitive",
    category,
    status: "beta",
    version: "0.1.0",
    path: orphan.relativePath,
    exportName: primaryExport,
    isReact: orphan.relativePath.endsWith(".tsx"),
    props: {},
    documentedOn: "/design-system/primitives",
    section: name,
    tags: [id, ...id.split("-")],
  };

  newEntries.push(entry);
  existingIds.add(id);
  existingPaths.add(orphan.relativePath);

  console.log(`  ${green("+")} ${bold(id)}`);
  console.log(`    name:     ${name}`);
  console.log(`    category: ${category}`);
  console.log(`    path:     ${dim(orphan.relativePath)}`);
  console.log(`    export:   ${primaryExport}`);
  console.log();
}

// ── Write Updated Registry ──────────────────────────────────────
registry.components.push(...newEntries);
registry.lastUpdated = new Date().toISOString().split("T")[0];
writeRegistry(registry);

console.log(`${bold("=".repeat(60))}`);
console.log(green(`  Added ${newEntries.length} component(s) to registry.json`));
console.log(`${bold("=".repeat(60))}\n`);
