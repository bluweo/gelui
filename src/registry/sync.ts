/**
 * Registry Sync Script — Fix broken paths
 * Run: npx tsx src/registry/sync.ts
 *
 * For registry entries pointing to src/primitives/:
 * 1. Check if the file exists at the registered path
 * 2. If not, search for the exportName across src/primitives/ to find new location
 * 3. Update path if found, report unresolvable entries otherwise
 * 4. Also handle legacy "dsl/primitives.tsx" paths gracefully
 */

import { existsSync } from "fs";
import { resolve } from "path";
import {
  ROOT,
  readRegistry,
  writeRegistry,
  scanPrimitiveFiles,
  parseExports,
  bold,
  green,
  yellow,
  red,
  cyan,
  dim,
} from "./utils.js";

// ── Load ────────────────────────────────────────────────────────
const registry = readRegistry();
const components = registry.components as Array<Record<string, unknown>>;

// ── Pre-scan all primitives for export lookup ───────────────────
const scannedFiles = scanPrimitiveFiles();

// Build a map: exportName -> relativePath
const exportToPath = new Map<string, string>();
for (const file of scannedFiles) {
  for (const exp of file.exportNames) {
    // First match wins (shouldn't have duplicates in practice)
    if (!exportToPath.has(exp)) {
      exportToPath.set(exp, file.relativePath);
    }
  }
}

// ── Process ─────────────────────────────────────────────────────
let updated = 0;
let unresolved = 0;
let alreadyOk = 0;
const changes: Array<{ id: string; oldPath: string; newPath: string }> = [];
const unresolvedEntries: Array<{ id: string; path: string; exportName?: string }> = [];

console.log(`\n${bold("=".repeat(60))}`);
console.log(bold("  REGISTRY SYNC — Path Resolution"));
console.log(`${bold("=".repeat(60))}\n`);

for (const c of components) {
  const path = c.path as string;
  const id = c.id as string;
  const exportName = c.exportName as string | undefined;

  // Only process entries that reference primitives or legacy dsl paths
  const isPrimitivePath = path && path.includes("primitives/");
  const isLegacyDslPath = path && path.includes("dsl/");

  if (!isPrimitivePath && !isLegacyDslPath) continue;

  const fullPath = resolve(ROOT, path);

  // File exists — no action needed
  if (existsSync(fullPath)) {
    alreadyOk++;
    continue;
  }

  // File missing — try to find by exportName
  if (exportName && exportToPath.has(exportName)) {
    const newPath = exportToPath.get(exportName)!;
    changes.push({ id, oldPath: path, newPath });
    c.path = newPath;
    updated++;
  } else {
    // Try to find by component name (fallback)
    const name = c.name as string;
    const possibleExport = name?.replace(/\s+/g, "");
    if (possibleExport && exportToPath.has(possibleExport)) {
      const newPath = exportToPath.get(possibleExport)!;
      changes.push({ id, oldPath: path, newPath });
      c.path = newPath;
      updated++;
    } else {
      unresolvedEntries.push({ id, path, exportName });
      unresolved++;
    }
  }
}

// ── Report ──────────────────────────────────────────────────────
if (alreadyOk > 0) {
  console.log(`  ${green("OK")}   ${alreadyOk} path(s) already correct\n`);
}

if (changes.length > 0) {
  console.log(`  ${cyan(bold("Updated Paths:"))}\n`);
  for (const ch of changes) {
    console.log(`  ${green("FIX")}  ${bold(ch.id)}`);
    console.log(`       ${red("-")} ${dim(ch.oldPath)}`);
    console.log(`       ${green("+")} ${ch.newPath}`);
    console.log();
  }
}

if (unresolvedEntries.length > 0) {
  console.log(`  ${red(bold("Unresolvable Entries:"))}\n`);
  for (const u of unresolvedEntries) {
    console.log(`  ${red("???")}  ${bold(u.id)}`);
    console.log(`       path: ${dim(u.path)}`);
    if (u.exportName) {
      console.log(`       exportName: ${dim(u.exportName)} (not found in any scanned file)`);
    }
    console.log();
  }
}

// ── Write if changes were made ──────────────────────────────────
if (updated > 0) {
  registry.lastUpdated = new Date().toISOString().split("T")[0];
  writeRegistry(registry);
}

// ── Summary ─────────────────────────────────────────────────────
console.log(`${bold("=".repeat(60))}`);
if (updated > 0) {
  console.log(green(`  SYNCED  ${updated} path(s) updated in registry.json`));
}
if (unresolved > 0) {
  console.log(yellow(`  WARN    ${unresolved} path(s) could not be resolved`));
}
if (updated === 0 && unresolved === 0) {
  console.log(green("  OK      All primitive paths are correct"));
}
console.log(`${bold("=".repeat(60))}\n`);
