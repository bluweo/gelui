/**
 * Registry Utilities — Shared helpers for registry tooling
 *
 * Provides file scanning, orphan detection, missing entry detection,
 * and formatted console reporting.
 */

import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { resolve, relative, basename, extname } from "path";

// ── Console Colors ──────────────────────────────────────────────
export const colors = {
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  reset: "\x1b[0m",
} as const;

export function green(s: string) { return `${colors.green}${s}${colors.reset}`; }
export function yellow(s: string) { return `${colors.yellow}${s}${colors.reset}`; }
export function red(s: string) { return `${colors.red}${s}${colors.reset}`; }
export function cyan(s: string) { return `${colors.cyan}${s}${colors.reset}`; }
export function dim(s: string) { return `${colors.dim}${s}${colors.reset}`; }
export function bold(s: string) { return `${colors.bold}${s}${colors.reset}`; }

// ── Types ───────────────────────────────────────────────────────
export interface ScannedFile {
  /** Absolute path to the file */
  absolutePath: string;
  /** Path relative to project root (e.g. "src/primitives/buttons/Button.tsx") */
  relativePath: string;
  /** Named exports found in the file */
  exportNames: string[];
}

export interface OrphanFile {
  relativePath: string;
  exportNames: string[];
}

export interface MissingEntry {
  id: string;
  registryPath: string;
}

export interface ValidationReport {
  totalRegistryEntries: number;
  filesChecked: number;
  orphans: OrphanFile[];
  missing: MissingEntry[];
  exportMismatches: Array<{ id: string; exportName: string; filePath: string }>;
  layerStats: Record<string, number>;
  categoryStats: Record<string, number>;
  statusStats: Record<string, number>;
  errors: string[];
  warnings: string[];
}

// ── Project Root ────────────────────────────────────────────────
export const ROOT = resolve(import.meta.dirname || __dirname, "../..");
export const REGISTRY_PATH = resolve(ROOT, "src/registry/registry.json");
export const PRIMITIVES_DIR = resolve(ROOT, "src/primitives");

// ── File Scanning ───────────────────────────────────────────────

/** Files to skip when scanning for components */
const SKIP_FILES = new Set(["index.ts", "index.tsx", "types.ts", "types.tsx"]);
const SKIP_PATTERNS = [/\.test\./, /\.spec\./, /\.stories\./, /\.d\.ts$/];

/**
 * Recursively read all files in a directory.
 */
function readdirRecursive(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...readdirRecursive(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Parse a TypeScript/TSX file for exported function/const names.
 * Handles: export function Foo, export const Foo, export default function Foo,
 * and re-exports like export { Foo } from ...
 */
export function parseExports(filePath: string): string[] {
  if (!existsSync(filePath)) return [];
  const content = readFileSync(filePath, "utf-8");
  const exports: string[] = [];

  // export function Name / export const Name / export class Name
  const namedExportRe = /export\s+(?:function|const|let|var|class)\s+([A-Z]\w*)/g;
  let match: RegExpExecArray | null;
  while ((match = namedExportRe.exec(content)) !== null) {
    exports.push(match[1]);
  }

  // export default function Name
  const defaultFnRe = /export\s+default\s+function\s+([A-Z]\w*)/g;
  while ((match = defaultFnRe.exec(content)) !== null) {
    exports.push(match[1]);
  }

  // export { Name, Name2 } — inline or from another module
  const reExportRe = /export\s*\{([^}]+)\}/g;
  while ((match = reExportRe.exec(content)) !== null) {
    const names = match[1].split(",").map((s) => s.trim().split(/\s+as\s+/).pop()!.trim());
    for (const name of names) {
      if (/^[A-Z]/.test(name)) exports.push(name);
    }
  }

  return [...new Set(exports)];
}

/**
 * Scan src/primitives/ for component .tsx files.
 * Skips index.ts, types.ts, hooks, tests, stories.
 */
export function scanPrimitiveFiles(): ScannedFile[] {
  if (!existsSync(PRIMITIVES_DIR)) return [];

  const allFiles = readdirRecursive(PRIMITIVES_DIR);
  const results: ScannedFile[] = [];

  for (const absPath of allFiles) {
    const name = basename(absPath);
    const ext = extname(absPath);

    // Only .tsx and .ts files (component-like)
    if (ext !== ".tsx" && ext !== ".ts") continue;
    // Skip utility / index / type files
    if (SKIP_FILES.has(name)) continue;
    // Skip tests, stories, type declarations
    if (SKIP_PATTERNS.some((p) => p.test(name))) continue;
    // Skip hooks (files starting with "use")
    if (name.startsWith("use")) continue;

    const relPath = relative(ROOT, absPath);
    const exportNames = parseExports(absPath);

    results.push({
      absolutePath: absPath,
      relativePath: relPath,
      exportNames,
    });
  }

  return results;
}

// ── Comparison Helpers ──────────────────────────────────────────

/**
 * Find files in src/primitives/ that are NOT referenced by any registry entry.
 */
export function findOrphans(
  registryPaths: Set<string>,
  scannedFiles: ScannedFile[]
): OrphanFile[] {
  return scannedFiles
    .filter((f) => !registryPaths.has(f.relativePath))
    .map((f) => ({ relativePath: f.relativePath, exportNames: f.exportNames }));
}

/**
 * Find registry entries whose path points to a file that doesn't exist.
 */
export function findMissing(
  entries: Array<{ id: string; path: string }>
): MissingEntry[] {
  return entries
    .filter((e) => {
      if (e.path === "inline" || e.path.startsWith("src/styles/")) return false;
      const fullPath = resolve(ROOT, e.path);
      return !existsSync(fullPath);
    })
    .map((e) => ({ id: e.id, registryPath: e.path }));
}

// ── Reporting ───────────────────────────────────────────────────

/**
 * Format and print a full validation report to stdout.
 */
export function formatReport(report: ValidationReport): void {
  const divider = "=".repeat(60);

  console.log(`\n${bold(divider)}`);
  console.log(bold("  REGISTRY VALIDATION REPORT"));
  console.log(`${bold(divider)}\n`);

  // Summary counts
  console.log(`  Registry entries:  ${bold(String(report.totalRegistryEntries))}`);
  console.log(`  Files checked:     ${bold(String(report.filesChecked))}`);
  console.log(`  Errors:            ${report.errors.length > 0 ? red(String(report.errors.length)) : green("0")}`);
  console.log(`  Warnings:          ${report.warnings.length > 0 ? yellow(String(report.warnings.length)) : green("0")}`);

  // Layer breakdown
  console.log(`\n  ${bold("By Layer:")}`);
  for (const [layer, count] of Object.entries(report.layerStats).sort()) {
    console.log(`    ${cyan(layer.padEnd(14))} ${count}`);
  }

  // Category breakdown
  console.log(`\n  ${bold("By Category:")}`);
  for (const [cat, count] of Object.entries(report.categoryStats).sort()) {
    console.log(`    ${cyan(cat.padEnd(14))} ${count}`);
  }

  // Status breakdown
  console.log(`\n  ${bold("By Status:")}`);
  for (const [status, count] of Object.entries(report.statusStats).sort()) {
    const colorFn = status === "stable" ? green : status === "deprecated" ? red : yellow;
    console.log(`    ${colorFn(status.padEnd(14))} ${count}`);
  }

  // Missing files
  if (report.missing.length > 0) {
    console.log(`\n  ${red(bold("Missing Files:"))}`);
    for (const m of report.missing) {
      console.log(`    ${red("MISS")} ${m.id} -> ${dim(m.registryPath)}`);
    }
  }

  // Orphan files
  if (report.orphans.length > 0) {
    console.log(`\n  ${yellow(bold("Orphan Files (not in registry):"))}`);
    for (const o of report.orphans) {
      console.log(`    ${yellow("ORPH")} ${o.relativePath} ${dim(`[${o.exportNames.join(", ")}]`)}`);
    }
  }

  // Export mismatches
  if (report.exportMismatches.length > 0) {
    console.log(`\n  ${red(bold("Export Mismatches:"))}`);
    for (const m of report.exportMismatches) {
      console.log(`    ${red("EXPT")} ${m.id}: "${m.exportName}" not found in ${dim(m.filePath)}`);
    }
  }

  // Errors
  if (report.errors.length > 0) {
    console.log(`\n  ${red(bold("Errors:"))}`);
    for (const e of report.errors) {
      console.log(`    ${red("ERR")}  ${e}`);
    }
  }

  // Warnings
  if (report.warnings.length > 0) {
    console.log(`\n  ${yellow(bold("Warnings:"))}`);
    for (const w of report.warnings) {
      console.log(`    ${yellow("WARN")} ${w}`);
    }
  }

  // Result
  console.log(`\n${bold(divider)}`);
  if (report.errors.length === 0 && report.warnings.length === 0) {
    console.log(green("  PASS  Registry is valid!"));
  } else if (report.errors.length === 0) {
    console.log(yellow(`  PASS  Registry valid with ${report.warnings.length} warning(s)`));
  } else {
    console.log(red(`  FAIL  ${report.errors.length} error(s), ${report.warnings.length} warning(s)`));
  }
  console.log(`${bold(divider)}\n`);
}

// ── Category Inference ──────────────────────────────────────────

/** Map folder names to categories */
const FOLDER_CATEGORY_MAP: Record<string, string> = {
  buttons: "interactive",
  button: "interactive",
  interactive: "interactive",
  inputs: "form",
  input: "form",
  form: "form",
  forms: "form",
  typography: "typography",
  text: "typography",
  surfaces: "surface",
  surface: "surface",
  cards: "surface",
  card: "surface",
  feedback: "feedback",
  navigation: "navigation",
  nav: "navigation",
  layout: "layout",
  data: "data",
  table: "data",
  overlay: "overlay",
  modal: "overlay",
  dialog: "overlay",
  media: "media",
  glass: "glass",
};

/**
 * Infer a category from the folder path of a file.
 * e.g. "src/primitives/buttons/Button.tsx" -> "interactive"
 */
export function inferCategory(relativePath: string): string {
  const parts = relativePath.split("/");
  // Walk from deepest to shallowest folder
  for (let i = parts.length - 2; i >= 0; i--) {
    const folder = parts[i].toLowerCase();
    if (FOLDER_CATEGORY_MAP[folder]) return FOLDER_CATEGORY_MAP[folder];
  }
  return "interactive"; // sensible default
}

/**
 * Convert a filename to kebab-case ID.
 * e.g. "GlassButton.tsx" -> "glass-button"
 */
export function toKebabCase(filename: string): string {
  const name = filename.replace(/\.(tsx?|astro)$/, "");
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/**
 * Convert a filename to PascalCase display name.
 * e.g. "glass-button" -> "Glass Button", "GlassButton.tsx" -> "Glass Button"
 */
export function toDisplayName(filename: string): string {
  const name = filename.replace(/\.(tsx?|astro)$/, "");
  // Split on transitions: lowercase->uppercase, or hyphens/underscores
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ── Registry I/O ────────────────────────────────────────────────

export interface RegistryData {
  version: string;
  lastUpdated: string;
  components: Array<Record<string, unknown>>;
}

export function readRegistry(): RegistryData {
  const raw = readFileSync(REGISTRY_PATH, "utf-8");
  return JSON.parse(raw);
}

export function writeRegistry(data: RegistryData): void {
  const { writeFileSync } = require("fs") as typeof import("fs");
  writeFileSync(REGISTRY_PATH, JSON.stringify(data, null, 2) + "\n", "utf-8");
}
