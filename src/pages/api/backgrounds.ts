export const prerender = false;

import type { APIRoute } from "astro";
import { readdir } from "fs/promises";
import path from "path";

const SUPPORTED_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function fileNameToLabel(filename: string): string {
  const name = filename.replace(/\.[^.]+$/, "");
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export const GET: APIRoute = async () => {
  const baseDir = path.join(process.cwd(), "public", "backgrounds");

  try {
    const backgrounds: { id: string; src: string; label: string; theme: string }[] = [];

    for (const theme of ["light", "dark"] as const) {
      const themeDir = path.join(baseDir, theme);
      try {
        const files = await readdir(themeDir);
        for (const f of files) {
          if (!SUPPORTED_EXTS.has(path.extname(f).toLowerCase())) continue;
          backgrounds.push({
            id: `${theme}:${f.replace(/\.[^.]+$/, "")}`,
            src: `/backgrounds/${theme}/${f}`,
            label: fileNameToLabel(f),
            theme,
          });
        }
      } catch {
        /* subfolder doesn't exist — skip */
      }
    }

    backgrounds.sort((a, b) => a.label.localeCompare(b.label));
    return new Response(JSON.stringify(backgrounds), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response("[]", {
      headers: { "Content-Type": "application/json" },
    });
  }
};
