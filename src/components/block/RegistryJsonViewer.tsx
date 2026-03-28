import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";
// @ts-ignore — Vite raw import
import registryRaw from "@/registry/registry.json?raw";
// @ts-ignore — Vite raw import
import schemaRaw from "@/registry/component-registry.schema.json?raw";
// @ts-ignore — Vite raw import
import zodRaw from "@/registry/registry.schema.ts?raw";

export function RegistryJsonViewer() {
  const [openFile, setOpenFile] = useState<"registry" | "schema" | "zod" | null>(null);

  useEffect(() => {
    const handlers = {
      "gelui:view-registry-json": () => setOpenFile("registry"),
      "gelui:view-schema-json": () => setOpenFile("schema"),
      "gelui:view-zod-schema": () => setOpenFile("zod"),
    };

    Object.entries(handlers).forEach(([event, handler]) => {
      window.addEventListener(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        window.removeEventListener(event, handler);
      });
    };
  }, []);

  const close = () => setOpenFile(null);

  return (
    <>
      {/* Registry JSON viewer */}
      <ViewSourceModal
        open={openFile === "registry"}
        onClose={close}
        title="registry.json — AI Master File"
        code={registryRaw}
        components={[
          { name: "registry.json", path: "src/registry/registry.json", description: "Single source of truth for all components. AI reads this to discover, select, and compose primitives." },
          { name: "component-registry.schema.json", path: "src/registry/component-registry.schema.json", description: "JSON Schema v2 — defines the registry format including ai, composition, constraints, rendering, examples fields." },
          { name: "registry.schema.ts", path: "src/registry/registry.schema.ts", description: "Zod validation schema — TypeScript runtime validation for registry entries." },
        ]}
      />

      {/* Schema JSON viewer */}
      <ViewSourceModal
        open={openFile === "schema"}
        onClose={close}
        title="component-registry.schema.json — Schema v2"
        code={schemaRaw}
        components={[
          { name: "ai", path: "Schema field", description: "Usage intelligence: useWhen, avoidWhen, priority, semanticRole, keywords — tells AI when to pick this component" },
          { name: "composition", path: "Schema field", description: "Composition rules: allowedChildren, allowedParents, commonSiblings, composedWith — prevents invalid hierarchies" },
          { name: "constraints", path: "Schema field", description: "Usage constraints: maxPerPage, doNotUseFor, requiresParent, contrastAware — prevents misuse" },
          { name: "rendering", path: "Schema field", description: "SSR metadata: ssrSafe, requiresClient, hydrationRisk — ensures safe server rendering" },
          { name: "examples", path: "Schema field", description: "JSX examples: title + jsx snippet — AI copies these patterns directly" },
        ]}
      />

      {/* Zod schema viewer */}
      <ViewSourceModal
        open={openFile === "zod"}
        onClose={close}
        title="registry.schema.ts — Zod Validation"
        code={zodRaw}
        components={[
          { name: "RegistrySchema", path: "Zod schema", description: "Root schema: validates the entire registry.json file structure" },
          { name: "ComponentSchema", path: "Zod schema", description: "Component entry schema: validates each component with all fields" },
          { name: "AISchema", path: "Zod schema", description: "AI metadata: useWhen, avoidWhen, priority, semanticRole, keywords" },
          { name: "CompositionSchema", path: "Zod schema", description: "Composition rules: allowedChildren, allowedParents, siblings" },
          { name: "ExampleSchema", path: "Zod schema", description: "Example entry: title + JSX snippet for AI to reference" },
        ]}
      />
    </>
  );
}
