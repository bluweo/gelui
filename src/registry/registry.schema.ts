/**
 * GelUI Component Registry Schema v2
 * Zod validation for AI-ready component registry
 */

import { z } from "zod";

export const PropSchema = z.object({
  type: z.string(),
  options: z.array(z.string()).optional(),
  default: z.any().optional(),
  description: z.string().optional(),
  required: z.boolean().optional(),
});

export const AISchema = z.object({
  useWhen: z.array(z.string()).optional(),
  avoidWhen: z.array(z.string()).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  semanticRole: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

export const CompositionSchema = z.object({
  allowedChildren: z.array(z.string()).optional(),
  allowedParents: z.array(z.string()).optional(),
  commonSiblings: z.array(z.string()).optional(),
  composedWith: z.array(z.string()).optional(),
});

export const ConstraintsSchema = z.object({
  maxPerPage: z.number().optional(),
  doNotUseFor: z.array(z.string()).optional(),
  requiresParent: z.string().optional(),
  contrastAware: z.boolean().optional(),
});

export const RenderingSchema = z.object({
  ssrSafe: z.boolean().optional(),
  requiresClient: z.boolean().optional(),
  hydrationRisk: z.enum(["none", "low", "medium", "high"]).optional(),
});

export const ExampleSchema = z.object({
  title: z.string().optional(),
  jsx: z.string(),
});

export const ComponentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  layer: z.enum(["token", "primitive", "component", "pattern", "core"]),
  category: z.string().optional(),
  status: z.enum(["experimental", "stable", "deprecated", "planned"]).optional(),
  version: z.string().optional(),
  path: z.string().optional(),
  importPath: z.string().optional(),
  exportName: z.string().optional(),
  cssClass: z.string().optional(),
  usage: z.string().optional(),
  usageNote: z.string().optional(),
  isReact: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  props: z.record(PropSchema).optional(),
  ai: AISchema.optional(),
  composition: CompositionSchema.optional(),
  constraints: ConstraintsSchema.optional(),
  rendering: RenderingSchema.optional(),
  examples: z.array(ExampleSchema).optional(),
});

export const RegistrySchema = z.object({
  version: z.string(),
  lastUpdated: z.string().optional(),
  components: z.array(ComponentSchema),
});

export type Registry = z.infer<typeof RegistrySchema>;
export type Component = z.infer<typeof ComponentSchema>;
export type AI = z.infer<typeof AISchema>;
export type Composition = z.infer<typeof CompositionSchema>;
export type Constraints = z.infer<typeof ConstraintsSchema>;
export type Rendering = z.infer<typeof RenderingSchema>;
export type Example = z.infer<typeof ExampleSchema>;
