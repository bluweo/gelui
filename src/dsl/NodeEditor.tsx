/* ═══════════════════════════════════════════════
   GEL UI — Node Editor (Phase 3)
   Visual node-based composition using React Flow.
   Drag primitives → connect → generates JSON DSL → live preview.
   ═══════════════════════════════════════════════ */
import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  type Node,
  type Edge,
  type Connection,
  type NodeTypes,
  type OnConnect,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { DSLRenderer, DSL_EXAMPLES } from "./DSLRenderer";
import { PRIMITIVE_MAP } from "./primitives";
import type { DSLNode } from "@/registry/types";
import { LAYER_META } from "@/registry/types";

/* ─── Theme detection ─── */
function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const check = () => setDark(document.documentElement.getAttribute("data-theme") === "dark");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

/* ─── Palette categories ─── */
const PALETTE_GROUPS = [
  { label: "Typography", items: [
    { id: "heading", name: "Heading", color: "#7C3AED" },
    { id: "text", name: "Text", color: "#7C3AED" },
    { id: "label", name: "Label", color: "#7C3AED" },
    { id: "caption", name: "Caption", color: "#7C3AED" },
    { id: "code", name: "Code", color: "#7C3AED" },
    { id: "link", name: "Link", color: "#7C3AED" },
  ]},
  { label: "Interactive", items: [
    { id: "button", name: "Button", color: "#354334" },
    { id: "icon-button", name: "Icon Button", color: "#354334" },
    { id: "toggle", name: "Toggle", color: "#354334" },
    { id: "checkbox", name: "Checkbox", color: "#354334" },
    { id: "radio", name: "Radio", color: "#354334" },
  ]},
  { label: "Surface", items: [
    { id: "card", name: "Card", color: "#0EA5E9" },
    { id: "surface", name: "Surface", color: "#0EA5E9" },
    { id: "divider", name: "Divider", color: "#0EA5E9" },
  ]},
  { label: "Form", items: [
    { id: "input", name: "Input", color: "#F59E0B" },
    { id: "textarea", name: "Textarea", color: "#F59E0B" },
  ]},
  { label: "Layout", items: [
    { id: "stack", name: "Stack", color: "#10B981" },
    { id: "inline", name: "Inline", color: "#10B981" },
    { id: "center", name: "Center", color: "#10B981" },
    { id: "grid", name: "Grid", color: "#10B981" },
    { id: "spacer", name: "Spacer", color: "#10B981" },
    { id: "box", name: "Box", color: "#10B981" },
  ]},
  { label: "Feedback", items: [
    { id: "spinner", name: "Spinner", color: "#EC4899" },
    { id: "progress", name: "Progress", color: "#EC4899" },
    { id: "skeleton", name: "Skeleton", color: "#EC4899" },
  ]},
  { label: "Data", items: [
    { id: "badge", name: "Badge", color: "#F97316" },
    { id: "avatar", name: "Avatar", color: "#F97316" },
  ]},
  { label: "Navigation", items: [
    { id: "tab-bar", name: "Tab Bar", color: "#6366F1" },
    { id: "breadcrumb", name: "Breadcrumb", color: "#6366F1" },
  ]},
];

/* ─── Custom Node Component ─── */
function ComponentNode({ id, data }: { id: string; data: { label: string; componentType: string; color: string; props: Record<string, unknown>; childText?: string } }) {
  const isDark = useTheme();
  const bg = isDark ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.97)";
  const border = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";

  return (
    <div
      style={{
        background: bg,
        border: `1.5px solid ${border}`,
        borderRadius: "12px",
        minWidth: "160px",
        maxWidth: "240px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{
        background: data.color,
        padding: "6px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#fff", textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>
          {data.componentType}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "10px 12px" }}>
        <span style={{
          fontSize: "13px",
          fontWeight: 600,
          color: isDark ? "#fff" : "#000",
          display: "block",
        }}>
          {data.label}
        </span>
        {data.childText && (
          <span style={{ fontSize: "11px", color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", display: "block", marginTop: "4px", fontFamily: "var(--font-mono)" }}>
            "{data.childText.slice(0, 30)}{data.childText.length > 30 ? "…" : ""}"
          </span>
        )}
        {Object.entries(data.props).length > 0 && (
          <div style={{ marginTop: "6px", display: "flex", flexWrap: "wrap", gap: "3px" }}>
            {Object.entries(data.props).slice(0, 4).map(([k, v]) => (
              <span key={k} style={{
                fontSize: "9px", fontFamily: "var(--font-mono)",
                padding: "2px 5px", borderRadius: "3px",
                background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)",
              }}>
                {k}={String(v)}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Handles */}
      <Handle type="target" position={Position.Top} style={{ width: "8px", height: "8px", background: data.color, border: "2px solid #fff" }} />
      <Handle type="source" position={Position.Bottom} style={{ width: "8px", height: "8px", background: data.color, border: "2px solid #fff" }} />
    </div>
  );
}

const nodeTypes: NodeTypes = {
  component: ComponentNode,
};

/* ─── Nodes → DSL converter ─── */
function nodesToDSL(nodes: Node[], edges: Edge[]): DSLNode | null {
  if (nodes.length === 0) return null;

  // Build adjacency: parent → children
  const childMap = new Map<string, string[]>();
  const hasParent = new Set<string>();

  for (const edge of edges) {
    const children = childMap.get(edge.source) || [];
    children.push(edge.target);
    childMap.set(edge.source, children);
    hasParent.add(edge.target);
  }

  // Find root nodes (no incoming edges)
  const roots = nodes.filter(n => !hasParent.has(n.id));
  if (roots.length === 0) return null;

  // Recursive build
  function buildNode(nodeId: string): DSLNode {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return { type: "box" };

    const data = node.data as { componentType: string; props: Record<string, unknown>; childText?: string };
    const childIds = childMap.get(nodeId) || [];

    const dslNode: DSLNode = {
      type: data.componentType,
      props: Object.keys(data.props).length > 0 ? data.props : undefined,
    };

    if (childIds.length > 0) {
      dslNode.children = childIds.map(buildNode);
    } else if (data.childText) {
      dslNode.children = data.childText;
    }

    return dslNode;
  }

  // If single root, return it; if multiple, wrap in stack
  if (roots.length === 1) {
    return buildNode(roots[0].id);
  }
  return {
    type: "stack",
    props: { gap: "16px" },
    children: roots.map(r => buildNode(r.id)),
  };
}

/* ─── Load example into nodes ─── */
let nodeCounter = 0;
function dslToNodes(dsl: DSLNode, x = 300, y = 100, depth = 0): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const id = `node-${nodeCounter++}`;

  const palette = PALETTE_GROUPS.flatMap(g => g.items);
  const color = palette.find(p => p.id === dsl.type)?.color ?? "#666";

  const props = dsl.props ?? {};
  const childText = typeof dsl.children === "string" ? dsl.children : undefined;

  nodes.push({
    id,
    type: "component",
    position: { x, y },
    data: { label: dsl.type, componentType: dsl.type, color, props, childText },
  });

  if (Array.isArray(dsl.children)) {
    const spacing = 220;
    const totalWidth = (dsl.children.length - 1) * spacing;
    const startX = x - totalWidth / 2;

    dsl.children.forEach((child, i) => {
      const childResult = dslToNodes(child, startX + i * spacing, y + 140, depth + 1);
      const childId = childResult.nodes[0]?.id;
      if (childId) {
        edges.push({ id: `edge-${id}-${childId}`, source: id, target: childId, type: "smoothstep", animated: true });
      }
      nodes.push(...childResult.nodes);
      edges.push(...childResult.edges);
    });
  }

  return { nodes, edges };
}

/* ═══════════════════════════════════════════════
   MAIN NODE EDITOR COMPONENT
   ═══════════════════════════════════════════════ */
function NodeEditorInner() {
  const isDark = useTheme();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [dslOutput, setDslOutput] = useState<DSLNode | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [showJSON, setShowJSON] = useState(false);
  const [paletteCollapsed, setPaletteCollapsed] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  // Update DSL on node/edge changes
  useEffect(() => {
    const dsl = nodesToDSL(nodes, edges);
    setDslOutput(dsl);
  }, [nodes, edges]);

  const onConnect: OnConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, type: "smoothstep", animated: true }, eds)),
    [setEdges],
  );

  // Drop from palette
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("application/gelui-type");
    const name = e.dataTransfer.getData("application/gelui-name");
    const color = e.dataTransfer.getData("application/gelui-color");
    if (!type) return;

    const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: "component",
      position,
      data: { label: name || type, componentType: type, color: color || "#666", props: {}, childText: "" },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [screenToFlowPosition, setNodes]);

  // Load example
  const loadExample = useCallback((idx: number) => {
    nodeCounter = 0;
    const example = DSL_EXAMPLES[idx];
    if (!example) return;
    const { nodes: newNodes, edges: newEdges } = dslToNodes(example.dsl);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [setNodes, setEdges]);

  // Clear canvas
  const clearCanvas = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  const textColor = isDark ? "#fff" : "#000";
  const mutedColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  const panelBg = isDark ? "rgba(20,20,20,0.92)" : "rgba(255,255,255,0.92)";
  const borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
      {/* Toolbar */}
      <div
        className="glass-1 glass-specular"
        style={{ borderRadius: "var(--glass-radius, 16px)", padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}
      >
        <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.06em", color: mutedColor }}>Load</span>
        {DSL_EXAMPLES.map((ex, i) => (
          <button
            key={ex.id}
            onClick={() => loadExample(i)}
            style={{
              padding: "5px 12px", borderRadius: "var(--glass-radius-pill, 100px)", border: `1px solid ${borderColor}`,
              background: "transparent", color: mutedColor, fontSize: "11px", fontWeight: 500, cursor: "pointer", transition: "all 200ms",
            }}
          >
            {ex.name}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button onClick={clearCanvas} style={{ padding: "5px 12px", borderRadius: "var(--glass-radius-pill, 100px)", border: `1px solid ${borderColor}`, background: "transparent", color: mutedColor, fontSize: "11px", cursor: "pointer" }}>
          Clear
        </button>
        <button onClick={() => setShowPreview(!showPreview)} style={{ padding: "5px 12px", borderRadius: "var(--glass-radius-pill, 100px)", border: `1px solid ${showPreview ? textColor : borderColor}`, background: showPreview ? textColor : "transparent", color: showPreview ? (isDark ? "#000" : "#fff") : mutedColor, fontSize: "11px", fontWeight: 500, cursor: "pointer", transition: "all 200ms" }}>
          Preview
        </button>
        <button onClick={() => setShowJSON(!showJSON)} style={{ padding: "5px 12px", borderRadius: "var(--glass-radius-pill, 100px)", border: `1px solid ${showJSON ? textColor : borderColor}`, background: showJSON ? textColor : "transparent", color: showJSON ? (isDark ? "#000" : "#fff") : mutedColor, fontSize: "11px", fontWeight: 500, cursor: "pointer", transition: "all 200ms" }}>
          JSON
        </button>
      </div>

      {/* Main area */}
      <div style={{ display: "grid", gridTemplateColumns: showPreview || showJSON ? "1fr 380px" : "1fr", gap: "16px", height: "600px" }}>
        {/* Canvas */}
        <div
          ref={reactFlowWrapper}
          style={{ borderRadius: "var(--glass-radius, 16px)", overflow: "hidden", border: `1px solid ${borderColor}`, position: "relative" }}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            colorMode={isDark ? "dark" : "light"}
            proOptions={{ hideAttribution: true }}
            defaultEdgeOptions={{ type: "smoothstep", animated: true }}
          >
            <Background gap={20} size={1} color={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} />
            <Controls position="bottom-right" style={{ borderRadius: "8px", overflow: "hidden" }} />
            <MiniMap
              position="bottom-left"
              style={{ borderRadius: "8px", overflow: "hidden", background: isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.8)" }}
              maskColor={isDark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.1)"}
              nodeColor={(n) => (n.data as { color: string })?.color ?? "#666"}
            />

            {/* Palette Panel */}
            <Panel position="top-left">
              <div style={{
                background: panelBg,
                backdropFilter: "blur(20px)",
                borderRadius: "12px",
                border: `1px solid ${borderColor}`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                width: paletteCollapsed ? "40px" : "180px",
                maxHeight: "520px",
                overflow: "hidden",
                transition: "width 200ms ease",
              }}>
                {/* Palette header */}
                <div
                  style={{ padding: "8px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${borderColor}`, cursor: "pointer" }}
                  onClick={() => setPaletteCollapsed(!paletteCollapsed)}
                >
                  {!paletteCollapsed && <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase" as const, letterSpacing: "0.06em", color: mutedColor }}>Primitives</span>}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={mutedColor} strokeWidth="2" strokeLinecap="round">
                    {paletteCollapsed ? <path d="M9 18l6-6-6-6" /> : <path d="M15 18l-6-6 6-6" />}
                  </svg>
                </div>

                {/* Palette items */}
                {!paletteCollapsed && (
                  <div style={{ padding: "6px", maxHeight: "460px", overflowY: "auto", scrollbarWidth: "thin" }}>
                    {PALETTE_GROUPS.map((group) => (
                      <div key={group.label} style={{ marginBottom: "8px" }}>
                        <span style={{ fontSize: "9px", fontWeight: 650, textTransform: "uppercase" as const, letterSpacing: "0.06em", color: mutedColor, padding: "0 4px", display: "block", marginBottom: "3px" }}>
                          {group.label}
                        </span>
                        {group.items.map((item) => (
                          <div
                            key={item.id}
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData("application/gelui-type", item.id);
                              e.dataTransfer.setData("application/gelui-name", item.name);
                              e.dataTransfer.setData("application/gelui-color", item.color);
                              e.dataTransfer.effectAllowed = "move";
                            }}
                            style={{
                              padding: "5px 8px",
                              borderRadius: "6px",
                              cursor: "grab",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              transition: "background 150ms",
                              fontSize: "11px",
                              fontWeight: 500,
                              color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                          >
                            <div style={{ width: "6px", height: "6px", borderRadius: "2px", background: item.color, flexShrink: 0 }} />
                            {item.name}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Panel>
          </ReactFlow>
        </div>

        {/* Side panel: Preview + JSON */}
        {(showPreview || showJSON) && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", overflow: "hidden" }}>
            {/* Live Preview */}
            {showPreview && (
              <div
                className="glass-1 glass-specular"
                style={{ borderRadius: "var(--glass-radius, 16px)", flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}
              >
                <div style={{ padding: "8px 14px", borderBottom: `1px solid ${borderColor}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase" as const, letterSpacing: "0.06em", color: mutedColor }}>Live Preview</span>
                  <span style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: mutedColor }}>{nodes.length} nodes</span>
                </div>
                <div style={{ flex: 1, padding: "16px", overflow: "auto" }}>
                  {dslOutput ? <DSLRenderer node={dslOutput} /> : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: mutedColor, fontSize: "12px" }}>
                      Drag primitives to canvas
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* JSON Output */}
            {showJSON && (
              <div style={{ borderRadius: "var(--glass-radius, 16px)", overflow: "hidden", border: `1px solid ${borderColor}`, flex: showPreview ? undefined : 1, maxHeight: showPreview ? "200px" : undefined }}>
                <div style={{ padding: "8px 14px", background: "#1a1a1a", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "10px", fontWeight: 650, textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "rgba(255,255,255,0.4)" }}>DSL Output</span>
                  {dslOutput && (
                    <button
                      onClick={() => navigator.clipboard.writeText(JSON.stringify(dslOutput, null, 2))}
                      style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", background: "transparent", border: "none", cursor: "pointer" }}
                    >
                      Copy
                    </button>
                  )}
                </div>
                <pre style={{ margin: 0, padding: "12px", background: "#1a1a1a", color: "#e0e0e0", fontSize: "10px", fontFamily: "var(--font-mono)", lineHeight: 1.5, overflow: "auto", maxHeight: "100%" }}>
                  {dslOutput ? JSON.stringify(dslOutput, null, 2) : "// No nodes yet"}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* Wrapper with ReactFlowProvider */
export function NodeEditor() {
  return (
    <ReactFlowProvider>
      <NodeEditorInner />
    </ReactFlowProvider>
  );
}
