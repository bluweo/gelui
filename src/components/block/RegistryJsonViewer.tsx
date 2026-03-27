import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";
// @ts-ignore — Vite raw import
import registryRaw from "@/registry/registry.json?raw";

export function RegistryJsonViewer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("gelui:view-registry-json", handler);
    return () => window.removeEventListener("gelui:view-registry-json", handler);
  }, []);

  return (
    <ViewSourceModal
      open={open}
      onClose={() => setOpen(false)}
      title="registry.json — AI Master File"
      code={registryRaw}
      components={[
        { name: "registry.json", path: "src/registry/registry.json", description: "Single source of truth for all 99 components. AI reads this file to discover, select, and compose primitives into UI pages." },
        { name: "CLAUDE.md", path: "CLAUDE.md", description: "AI instruction file — auto-loaded at every session start. Contains SSR rules, contrast system, Tailwind v4 constraints." },
        { name: "REGISTRY_MAINTENANCE.md", path: "REGISTRY_MAINTENANCE.md", description: "Human-readable guide for updating the registry. Entry schema, validation commands, AI prompt template." },
      ]}
    />
  );
}
