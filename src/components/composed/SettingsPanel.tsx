import { useState } from "react";
import type { CSSProperties } from "react";
import { Heading, Text } from "@/primitives/typography";
import { Input, Select, FormGroup } from "@/primitives/inputs";
import { Toggle } from "@/primitives/controls";
import { Button } from "@/primitives/buttons";
import { Divider } from "@/primitives/surfaces";
import { TabBar } from "@/primitives/navigation";
import { Stack, Inline } from "@/primitives/layout";

interface SettingsPanelProps {
  className?: string;
  style?: CSSProperties;
}

export function SettingsPanel({ className = "", style }: SettingsPanelProps) {
  const [tab, setTab] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [digest, setDigest] = useState(false);

  return (
    <div className={`w-full max-w-[480px] ${className}`} style={style}>
      <Stack gap="20px">
        <Heading level={3}>Settings</Heading>

        <TabBar tabs={["General", "Appearance", "Notifications"]} active={tab} onChange={setTab} />

        <div className="rounded-[var(--glass-radius-sm)] bg-white dark:bg-[#1a1a1a] p-4">
          {tab === 0 && (
            <Stack gap="0px">
              <div className="flex items-center justify-between py-3 border-b border-[var(--theme-divider)]">
                <Text>Language</Text>
                <Select options={["English", "Thai", "Japanese"]} value="English" className="w-[140px]" />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[var(--theme-divider)]">
                <Text>Auto-save</Text>
                <Toggle checked={autoSave} onChange={setAutoSave} />
              </div>
              <div className="flex items-center justify-between py-3">
                <Text>Region</Text>
                <Select options={["US", "EU", "Asia"]} value="US" className="w-[140px]" />
              </div>
            </Stack>
          )}

          {tab === 1 && (
            <Stack gap="0px">
              <div className="flex items-center justify-between py-3 border-b border-[var(--theme-divider)]">
                <Text>Dark Mode</Text>
                <Toggle checked={darkMode} onChange={setDarkMode} />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[var(--theme-divider)]">
                <Text>Font Size</Text>
                <Select options={["Small", "Medium", "Large"]} value="Medium" className="w-[140px]" />
              </div>
              <div className="flex items-center justify-between py-3">
                <Text>Accent Color</Text>
                <Select options={["Default", "Blue", "Purple", "Green"]} value="Default" className="w-[140px]" />
              </div>
            </Stack>
          )}

          {tab === 2 && (
            <Stack gap="0px">
              <div className="flex items-center justify-between py-3 border-b border-[var(--theme-divider)]">
                <Text>Email Notifications</Text>
                <Toggle checked={notifications} onChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[var(--theme-divider)]">
                <Text>Push Notifications</Text>
                <Toggle checked={false} />
              </div>
              <div className="flex items-center justify-between py-3">
                <Text>Weekly Digest</Text>
                <Toggle checked={digest} onChange={setDigest} />
              </div>
            </Stack>
          )}
        </div>

        <Inline justify="end" gap="8px">
          <Button variant="ghost">Cancel</Button>
          <Button variant="solid">Save Changes</Button>
        </Inline>
      </Stack>
    </div>
  );
}
