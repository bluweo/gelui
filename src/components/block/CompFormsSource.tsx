import { useState, useEffect } from "react";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";
import IMPL_CONTACT from "@/components/composed/ContactForm.tsx?raw";
import IMPL_SETTINGS from "@/components/composed/SettingsPanel.tsx?raw";

const SOURCE_CODE = `import { ContactForm, SettingsPanel } from "@/components/composed";

{/* Contact Form */}
<ContactForm
  onSubmit={(data) => console.log(data)}
  subjects={["General", "Support", "Sales"]}
/>

{/* Settings Panel */}
<SettingsPanel />`;

const COMPONENTS = [
  {
    name: "ContactForm",
    path: "@/components/composed",
    description: "Name, email, subject dropdown, and message textarea with submit",
    implementation: IMPL_CONTACT,
    props: [
      { name: "onSubmit", type: "(data) => void" },
      { name: "subjects", type: "string[]", default: '["General", "Support", "Sales", "Partnership"]' },
      { name: "className", type: "string" },
    ],
  },
  {
    name: "SettingsPanel",
    path: "@/components/composed",
    description: "Tabbed settings with General, Appearance, and Notifications tabs. Uses Toggle, Select, and TabBar primitives.",
    implementation: IMPL_SETTINGS,
    props: [
      { name: "className", type: "string" },
    ],
  },
];

export function CompFormsSource() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="comp-forms"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);
  return <ViewSourceModal open={open} onClose={() => setOpen(false)} title="Forms & Input" code={SOURCE_CODE} components={COMPONENTS} />;
}
