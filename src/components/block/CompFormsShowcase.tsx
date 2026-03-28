import { ContactForm } from "@/components/composed/ContactForm";
import { SettingsPanel } from "@/components/composed/SettingsPanel";
import { Stack } from "@/primitives/layout";

export function CompFormsShowcase() {
  return (
    <Stack gap="24px">
      <div className="rounded-[var(--glass-radius-sm)] bg-white dark:bg-[#1a1a1a] p-4">
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/45 dark:text-white/40 mb-3 block">Contact Form</span>
        <div className="flex justify-center py-4">
          <ContactForm />
        </div>
      </div>

      <div className="rounded-[var(--glass-radius-sm)] bg-white dark:bg-[#1a1a1a] p-4">
        <span className="text-[10px] font-[650] uppercase tracking-[0.06em] text-black/45 dark:text-white/40 mb-3 block">Settings Panel</span>
        <div className="flex justify-center py-4">
          <SettingsPanel />
        </div>
      </div>
    </Stack>
  );
}
