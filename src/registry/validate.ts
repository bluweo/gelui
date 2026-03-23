/**
 * Registry Validation Script
 * Run: npx tsx src/registry/validate.ts
 *
 * Checks:
 * 1. All file paths exist (unless "inline")
 * 2. No duplicate IDs
 * 3. All composedOf references are valid IDs
 * 4. All slot accepts references are valid IDs (or "*")
 * 5. Required fields are present
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

interface RegistryEntry {
  id: string;
  name: string;
  path: string;
  composedOf?: string[];
  slots?: Record<string, { accepts: string[] }>;
  [key: string]: unknown;
}

const ROOT = resolve(import.meta.dirname || __dirname, "../..");
const registryPath = resolve(import.meta.dirname || __dirname, "registry.json");

const raw = readFileSync(registryPath, "utf-8");
const registry = JSON.parse(raw) as { components: RegistryEntry[] };

let errors = 0;
let warnings = 0;

function error(msg: string) { console.error(`❌ ERROR: ${msg}`); errors++; }
function warn(msg: string) { console.warn(`⚠️  WARN:  ${msg}`); warnings++; }
function ok(msg: string) { console.log(`✅ ${msg}`); }

// Collect all IDs
const allIds = new Set<string>();
const duplicates = new Set<string>();

for (const c of registry.components) {
  if (allIds.has(c.id)) {
    duplicates.add(c.id);
    error(`Duplicate ID: "${c.id}"`);
  }
  allIds.add(c.id);
}

// Validate each component
for (const c of registry.components) {
  // Required fields
  if (!c.id) error(`Missing ID on component "${c.name}"`);
  if (!c.name) error(`Missing name on "${c.id}"`);
  if (!c.path) error(`Missing path on "${c.id}"`);

  // File existence (skip "inline" components)
  if (c.path !== "inline" && !c.path.startsWith("src/styles/")) {
    const fullPath = resolve(ROOT, c.path);
    if (!existsSync(fullPath)) {
      warn(`File not found for "${c.id}": ${c.path}`);
    }
  }

  // composedOf references
  if (c.composedOf) {
    for (const ref of c.composedOf) {
      if (!allIds.has(ref)) {
        warn(`"${c.id}" composedOf references unknown ID: "${ref}"`);
      }
    }
  }

  // Slot accepts references
  if (c.slots) {
    for (const [slotName, slot] of Object.entries(c.slots)) {
      for (const ref of slot.accepts) {
        if (ref !== "*" && !allIds.has(ref)) {
          warn(`"${c.id}" slot "${slotName}" accepts unknown ID: "${ref}"`);
        }
      }
    }
  }
}

// Summary
console.log("\n" + "═".repeat(50));
console.log(`Registry: ${registry.components.length} components`);
console.log(`IDs: ${allIds.size} unique`);

const layers = new Map<string, number>();
for (const c of registry.components) {
  const layer = (c as any).layer || "unknown";
  layers.set(layer, (layers.get(layer) || 0) + 1);
}
for (const [layer, count] of [...layers.entries()].sort()) {
  console.log(`  ${layer}: ${count}`);
}

console.log(`\nResult: ${errors} errors, ${warnings} warnings`);
if (errors === 0 && warnings === 0) {
  ok("Registry is valid! ✨");
}
console.log("═".repeat(50));

process.exit(errors > 0 ? 1 : 0);
