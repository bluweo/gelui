/**
 * Registry Validation Script (Enhanced)
 * Run: npx tsx src/registry/validate.ts
 *
 * Checks:
 * 1. Required fields present on every entry
 * 2. No duplicate IDs
 * 3. All composedOf references are valid IDs
 * 4. All slot accepts references are valid IDs (or "*")
 * 5. File existence for every non-inline entry
 * 6. Orphan detection: .tsx files in src/primitives/ not in registry
 * 7. Export verification: exportName actually exists in the file
 * 8. Summary stats by layer, category, status
 *
 * Exit code 0 = all pass, 1 = errors found
 */

import { existsSync } from "fs";
import { resolve } from "path";
import {
  ROOT,
  readRegistry,
  scanPrimitiveFiles,
  findOrphans,
  findMissing,
  parseExports,
  formatReport,
  bold,
  green,
  yellow,
  red,
  cyan,
  dim,
  type ValidationReport,
  type OrphanFile,
  type MissingEntry,
} from "./utils.js";

// ── Load Registry ───────────────────────────────────────────────
const registry = readRegistry();
const components = registry.components as Array<Record<string, unknown>>;

// ── Build Report ────────────────────────────────────────────────
const report: ValidationReport = {
  totalRegistryEntries: components.length,
  filesChecked: 0,
  orphans: [],
  missing: [],
  exportMismatches: [],
  layerStats: {},
  categoryStats: {},
  statusStats: {},
  errors: [],
  warnings: [],
};

// ── 1. Duplicate ID Check ───────────────────────────────────────
const allIds = new Set<string>();
for (const c of components) {
  const id = c.id as string;
  if (allIds.has(id)) {
    report.errors.push(`Duplicate ID: "${id}"`);
  }
  allIds.add(id);
}

// ── 2. Required Fields ─────────────────────────────────────────
for (const c of components) {
  if (!c.id) report.errors.push(`Missing "id" on component "${c.name}"`);
  if (!c.name) report.errors.push(`Missing "name" on "${c.id}"`);
  if (!c.path) report.errors.push(`Missing "path" on "${c.id}"`);
}

// ── 3. File Existence ───────────────────────────────────────────
const registryPaths = new Set<string>();
for (const c of components) {
  const path = c.path as string;
  if (!path || path === "inline" || path.startsWith("src/styles/")) continue;

  registryPaths.add(path);
  report.filesChecked++;

  const fullPath = resolve(ROOT, path);
  if (!existsSync(fullPath)) {
    // Gracefully handle old "dsl/primitives.tsx" paths
    if (path.includes("dsl/")) {
      report.warnings.push(`Legacy path for "${c.id}": ${path} (file not found, may need sync)`);
    } else {
      report.errors.push(`File not found for "${c.id}": ${path}`);
    }
  }
}

// ── 4. Export Verification ──────────────────────────────────────
for (const c of components) {
  const exportName = c.exportName as string | undefined;
  const path = c.path as string;

  if (!exportName || !path || path === "inline" || path.startsWith("src/styles/")) continue;

  const fullPath = resolve(ROOT, path);
  if (!existsSync(fullPath)) continue; // already caught in file existence check

  const fileExports = parseExports(fullPath);
  if (!fileExports.includes(exportName)) {
    report.exportMismatches.push({
      id: c.id as string,
      exportName,
      filePath: path,
    });
  }
}

// ── 5. composedOf References ────────────────────────────────────
for (const c of components) {
  const refs = c.composedOf as string[] | undefined;
  if (!refs) continue;
  for (const ref of refs) {
    if (!allIds.has(ref)) {
      report.warnings.push(`"${c.id}" composedOf references unknown ID: "${ref}"`);
    }
  }
}

// ── 6. Slot accepts References ──────────────────────────────────
for (const c of components) {
  const slots = c.slots as Record<string, { accepts: string[] }> | undefined;
  if (!slots) continue;
  for (const [slotName, slot] of Object.entries(slots)) {
    for (const ref of slot.accepts) {
      if (ref !== "*" && !allIds.has(ref)) {
        report.warnings.push(`"${c.id}" slot "${slotName}" accepts unknown ID: "${ref}"`);
      }
    }
  }
}

// ── 7. Orphan Detection ────────────────────────────────────────
const scannedFiles = scanPrimitiveFiles();
const primitivePaths = new Set(
  components
    .filter((c) => typeof c.path === "string" && (c.path as string).includes("primitives/"))
    .map((c) => c.path as string)
);

// Also include all registry paths for broader orphan check
for (const p of registryPaths) {
  primitivePaths.add(p);
}

report.orphans = findOrphans(primitivePaths, scannedFiles);

// ── 8. Missing File Detection (primitives only) ────────────────
const primEntries = components
  .filter((c) => typeof c.path === "string" && (c.path as string).includes("primitives/"))
  .map((c) => ({ id: c.id as string, path: c.path as string }));
report.missing = findMissing(primEntries);

// ── 9. Stats ────────────────────────────────────────────────────
for (const c of components) {
  const layer = (c.layer as string) || "unknown";
  const category = (c.category as string) || "unknown";
  const status = (c.status as string) || "unknown";

  report.layerStats[layer] = (report.layerStats[layer] || 0) + 1;
  report.categoryStats[category] = (report.categoryStats[category] || 0) + 1;
  report.statusStats[status] = (report.statusStats[status] || 0) + 1;
}

// ── Output ──────────────────────────────────────────────────────
formatReport(report);

// ── Exit Code ───────────────────────────────────────────────────
process.exit(report.errors.length > 0 ? 1 : 0);
