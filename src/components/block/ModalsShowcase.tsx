import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDraggableModal } from "@/components/hooks/useDraggableModal";
import { PillTabs } from "@/primitives/navigation/PillTabs";
import { Toggle } from "@/primitives/controls/Toggle";
import { Button } from "@/primitives/buttons/Button";

/* ── Solid inner panel used inside all modals ── */
function SolidPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[var(--glass-radius-sm,10px)] bg-white dark:bg-[#1a1a1a] border border-black/[0.06] dark:border-white/[0.1] p-4 ${className}`}>
      {children}
    </div>
  );
}

/* ── Demo modal wrapper using the same pattern as all project modals ── */

function DemoModal({
  open,
  onClose,
  title,
  width = 420,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  width?: number;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const { panelRef, panelStyle, backdropDragged, onDragStart } = useDraggableModal({
    isOpen: open,
    onClose,
  });

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[900] bg-black/20 backdrop-blur-[var(--glass-blur-overlay)] flex items-center justify-center overflow-y-auto p-5 dark:bg-black/40 animate-backdrop-fade-in ${backdropDragged ? "items-start justify-start p-0" : ""}`}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="glass-panel max-w-[92vw] max-h-[calc(100vh-40px)] select-none cursor-grab active:cursor-grabbing flex flex-col overflow-hidden animate-panel-enter"
        style={{ ...panelStyle, width: `min(${width}px, 92vw)` }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={onDragStart}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <span className="text-[14px] font-[650] text-[var(--theme-fg)] tracking-[-0.01em]">
            {title}
          </span>
          <button
            className="w-7 h-7 flex items-center justify-center border-none bg-black/[0.06] rounded-full cursor-pointer text-[var(--theme-fg-muted)] transition-all duration-200 hover:bg-black/10 hover:text-[var(--theme-fg)] dark:bg-white/[0.08] dark:hover:bg-white/[0.14]"
            onClick={onClose}
            onMouseDown={(e) => e.stopPropagation()}
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="px-5 pb-4 overflow-y-auto flex-1" onMouseDown={(e) => e.stopPropagation()}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-5 pb-5 flex justify-end gap-2" onMouseDown={(e) => e.stopPropagation()}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

/* ── Modal demos ── */

function BasicDemo({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <DemoModal open={open} onClose={onClose} title="Confirm Action" width={400}
      footer={
        <>
          <span onMouseDown={(e) => e.stopPropagation()}><Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button></span>
          <span onMouseDown={(e) => e.stopPropagation()}><Button variant="solid" size="sm" onClick={onClose}>Confirm</Button></span>
        </>
      }
    >
      <SolidPanel>
        <p className="text-sm text-[var(--theme-fg)] leading-relaxed">
          Are you sure you want to proceed? This action will apply changes to your settings.
        </p>
      </SolidPanel>
    </DemoModal>
  );
}

function FormDemo({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <DemoModal open={open} onClose={onClose} title="Edit Profile" width={460}
      footer={
        <>
          <span onMouseDown={(e) => e.stopPropagation()}><Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button></span>
          <span onMouseDown={(e) => e.stopPropagation()}><Button variant="solid" size="sm" onClick={onClose}>Save</Button></span>
        </>
      }
    >
      <SolidPanel className="!p-0">
        {[
          { label: "Name", el: <input className="w-full bg-transparent border-none outline-none text-sm text-black/80 dark:text-white/80 placeholder:text-black/30 dark:placeholder:text-white/30 cursor-text" placeholder="John Doe" onMouseDown={(e: React.MouseEvent) => e.stopPropagation()} /> },
          { label: "Email", el: <input className="w-full bg-transparent border-none outline-none text-sm text-black/80 dark:text-white/80 placeholder:text-black/30 dark:placeholder:text-white/30 cursor-text" placeholder="john@example.com" onMouseDown={(e: React.MouseEvent) => e.stopPropagation()} /> },
          { label: "Bio", el: <textarea className="w-full bg-transparent border-none outline-none text-sm text-black/80 dark:text-white/80 placeholder:text-black/30 dark:placeholder:text-white/30 cursor-text h-20 resize-none scrollbar-thin" placeholder="Tell us about yourself..." onMouseDown={(e: React.MouseEvent) => e.stopPropagation()} /> },
        ].map((field, i, arr) => (
          <div key={field.label} className={`px-4 py-3 flex flex-col gap-1.5 ${i < arr.length - 1 ? "border-b border-[var(--theme-divider)]" : ""}`}>
            <label className="text-xs font-semibold text-[var(--theme-fg)]">{field.label}</label>
            {field.el}
          </div>
        ))}
      </SolidPanel>
    </DemoModal>
  );
}

function TabbedDemo({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState("General");
  const [toggles, setToggles] = useState({ theme: true, lang: false, notif: false, save: false });

  const settings = [
    { key: "theme" as const, label: "Theme Mode" },
    { key: "lang" as const, label: "Language" },
    { key: "notif" as const, label: "Notifications" },
    { key: "save" as const, label: "Auto-save" },
  ];

  return (
    <DemoModal open={open} onClose={onClose} title="Settings" width={520}>
      <div className="flex flex-col gap-4">
        {/* Tab bar — using PillTabs primitive */}
        <div onMouseDown={(e) => e.stopPropagation()}>
          <PillTabs
            tabs={["General", "Appearance", "Advanced"]}
            activeTab={tab}
            onChange={setTab}
            className="w-full"
          />
        </div>
        {/* Setting rows with Toggle primitives */}
        <SolidPanel className="!p-0">
          {settings.map((item, i, arr) => (
            <div key={item.key} className={`flex items-center justify-between px-4 py-3.5 ${i < arr.length - 1 ? "border-b border-black/[0.06] dark:border-white/[0.08]" : ""}`} onMouseDown={(e) => e.stopPropagation()}>
              <span className="text-[13px] text-black dark:text-white">{item.label}</span>
              <Toggle checked={toggles[item.key]} onChange={(v) => setToggles(prev => ({ ...prev, [item.key]: v }))} />
            </div>
          ))}
        </SolidPanel>
      </div>
    </DemoModal>
  );
}

function ConfirmDemo({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <DemoModal open={open} onClose={onClose} title="Delete Item" width={380}
      footer={
        <>
          <span onMouseDown={(e) => e.stopPropagation()}><Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button></span>
          <span onMouseDown={(e) => e.stopPropagation()}><Button variant="solid" size="sm" onClick={onClose} className="!bg-[var(--color-error)] !text-white">Delete</Button></span>
        </>
      }
    >
      <SolidPanel>
        <div className="flex flex-col items-center gap-3 text-center py-2">
          <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-[var(--theme-fg)]">Are you sure?</p>
          <p className="text-xs text-[var(--theme-fg-muted)] leading-relaxed">This action cannot be undone. This will permanently delete the item and all associated data.</p>
        </div>
      </SolidPanel>
    </DemoModal>
  );
}

function MediaDemo({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <DemoModal open={open} onClose={onClose} title="Upload Image" width={460}
      footer={
        <>
          <span onMouseDown={(e) => e.stopPropagation()}><Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button></span>
          <span onMouseDown={(e) => e.stopPropagation()}><Button variant="solid" size="sm" onClick={onClose}>Upload</Button></span>
        </>
      }
    >
      <SolidPanel>
        <div className="flex flex-col gap-4" onMouseDown={(e) => e.stopPropagation()}>
          {/* Drop zone */}
          <div className="h-28 rounded-[var(--glass-radius-sm,10px)] border-2 border-dashed border-[var(--theme-divider)] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[var(--theme-fg-subtle)] transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--theme-fg-subtle)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="text-xs text-[var(--theme-fg-muted)]">Drag & drop or click to upload</span>
            <span className="text-[10px] text-[var(--theme-fg-subtle)]">PNG, JPG up to 10MB</span>
          </div>
          {/* File item */}
          <div className="flex items-center gap-3 p-3 rounded-[var(--glass-radius-sm,10px)] bg-[var(--theme-header-bg)]">
            <div className="w-10 h-10 rounded-lg bg-[var(--theme-divider)] flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--theme-fg-muted)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[var(--theme-fg)] truncate">photo-2024.jpg</p>
              <p className="text-[10px] text-[var(--theme-fg-muted)]">2.4 MB • JPG</p>
            </div>
            <div className="w-16 h-1.5 rounded-full bg-[var(--theme-divider)] overflow-hidden shrink-0">
              <div className="h-full w-3/4 rounded-full bg-[var(--color-success)]" />
            </div>
          </div>
        </div>
      </SolidPanel>
    </DemoModal>
  );
}

/* ── Main showcase — table layout ── */

const DEMOS = [
  { id: "basic", label: "Basic", desc: "Simple confirmation dialog" },
  { id: "form", label: "Form", desc: "Input fields with labels" },
  { id: "tabbed", label: "Tabbed", desc: "Settings with tab navigation" },
  { id: "confirm", label: "Confirm", desc: "Destructive action warning" },
  { id: "media", label: "Media", desc: "File upload with progress" },
];

export function ModalsShowcase() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="relative">
      <div className="glass-1 rounded-[var(--glass-radius-sm,10px)] overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--theme-divider)]">
          <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-black/40 dark:text-white/40">Modal Types</span>
        </div>
        {DEMOS.map((demo, i) => (
          <div
            key={demo.id}
            className={`flex items-center justify-between px-4 py-3 ${i < DEMOS.length - 1 ? "border-b border-[var(--theme-divider)]" : ""}`}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-semibold text-black dark:text-white">{demo.label}</span>
              <span className="text-[11px] text-black/55 dark:text-white/55">{demo.desc}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setActiveModal(demo.id)}>
              Open
            </Button>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-[var(--theme-fg-subtle)] mt-3 px-1">All modals are draggable glass panels using <code className="text-[10px] bg-[var(--theme-header-bg)] px-1.5 py-0.5 rounded">useDraggableModal</code> hook</p>

      <BasicDemo open={activeModal === "basic"} onClose={() => setActiveModal(null)} />
      <FormDemo open={activeModal === "form"} onClose={() => setActiveModal(null)} />
      <TabbedDemo open={activeModal === "tabbed"} onClose={() => setActiveModal(null)} />
      <ConfirmDemo open={activeModal === "confirm"} onClose={() => setActiveModal(null)} />
      <MediaDemo open={activeModal === "media"} onClose={() => setActiveModal(null)} />
    </div>
  );
}
