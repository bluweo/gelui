import { useState, useEffect } from "react";
import { FormsShowcase } from "./FormsShowcase";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

// Auto-loaded from actual source files at build time
import IMPL_OTPINPUT from "@/primitives/inputs/OtpInput.tsx?raw";
import IMPL_PASSWORDINPUT from "@/primitives/inputs/PasswordInput.tsx?raw";
import IMPL_NUMBERINPUT from "@/primitives/inputs/NumberInput.tsx?raw";
import IMPL_INPUT from "@/primitives/inputs/Input.tsx?raw";
import IMPL_FORMGROUP from "@/primitives/inputs/FormGroup.tsx?raw";
import IMPL_TAGINPUT from "@/primitives/inputs/TagInput.tsx?raw";

const SOURCE_CODE = `import { Input, OtpInput, PasswordInput, NumberInput } from "@/primitives/inputs";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";
import { useState } from "react";

export function AdvancedInputs() {
  const isDark = useDarkMode();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [quantity, setQuantity] = useState(5);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* OTP / Pin Input — auto-focus, paste, success check */}
      <div className="card">
        <span className="type-overline">OTP / Pin Input</span>

        {/* 6-digit — shows green check when complete */}
        <span className="type-caption">6-digit verification code</span>
        <OtpInput length={6} value={otp} onChange={setOtp} />

        {/* 4-digit compact + Error state — side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <span className="type-caption">4-digit PIN</span>
            <OtpInput length={4} size="sm" />
          </div>
          <div>
            <span className="type-caption">Error state</span>
            <OtpInput length={6} error value="12" size="sm" disabled />
          </div>
        </div>
      </div>

      {/* Login Form — Username + Password with icons */}
      <div className="card">
        <span className="type-overline">Login Form</span>

        {/* Username with user icon */}
        <div className="row">
          <span className="type-label">Username</span>
          <div style={{ width: "70%", position: "relative" }}>
            <UserIcon />  {/* positioned absolute left */}
            <Input
              placeholder="Enter username"
              value={username}
              onChange={setUsername}
              style={{ paddingLeft: 36, background: "rgba(0,0,0,0.06)" }}
            />
          </div>
        </div>

        {/* Password with key icon + show/hide toggle */}
        <div className="row">
          <span className="type-label">Password</span>
          <div style={{ width: "70%", position: "relative" }}>
            <KeyIcon />  {/* positioned absolute left */}
            <PasswordInput
              placeholder="Enter password"
              value={password}
              onChange={setPassword}
              style={{ paddingLeft: 36, background: "rgba(0,0,0,0.06)" }}
            />
          </div>
        </div>
      </div>

      {/* Number Input — circle +/- buttons */}
      <div className="card">
        <span className="type-overline">Number Input</span>
        <div className="row">
          <span className="type-label">Default (1–20)</span>
          <NumberInput value={quantity} onChange={setQuantity} min={1} max={20} />
        </div>
        <div className="row">
          <span className="type-label">Step by 5</span>
          <NumberInput value={quantity} onChange={setQuantity} min={0} max={100} step={5} />
        </div>
      </div>
    </div>
  );
}`;

const COMPONENTS = [
  {
    name: "OtpInput", path: "@/primitives/inputs",
    description: "Multi-digit OTP/PIN input with auto-focus, paste support, success checkmark",
    implementation: IMPL_OTPINPUT,
    props: [
      { name: "length", type: "number", default: "6" },
      { name: "value", type: "string" },
      { name: "onChange", type: "(v: string) => void" },
      { name: "error", type: "boolean", default: "false" },
      { name: "size", type: "enum", options: ["sm", "md"], default: '"md"' },
      { name: "disabled", type: "boolean", default: "false" },
    ],
  },
  {
    name: "PasswordInput", path: "@/primitives/inputs",
    description: "Password input with show/hide eye toggle",
    implementation: IMPL_PASSWORDINPUT,
    props: [
      { name: "placeholder", type: "string" },
      { name: "value", type: "string" },
      { name: "onChange", type: "(v: string) => void" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
  },
  {
    name: "NumberInput", path: "@/primitives/inputs",
    description: "Numeric stepper with circle +/- buttons, min/max/step constraints",
    implementation: IMPL_NUMBERINPUT,
    props: [
      { name: "value", type: "number" },
      { name: "onChange", type: "(v: number) => void" },
      { name: "min", type: "number" },
      { name: "max", type: "number" },
      { name: "step", type: "number", default: "1" },
    ],
  },
  {
    name: "Input", path: "@/primitives/inputs",
    description: "Base text input with focus, validation, disabled states",
    implementation: IMPL_INPUT,
    props: [
      { name: "type", type: "string", default: '"text"' },
      { name: "placeholder", type: "string" },
      { name: "value", type: "string" },
      { name: "onChange", type: "(v: string) => void" },
      { name: "size", type: "enum", options: ["sm", "md", "lg"], default: '"md"' },
      { name: "error", type: "boolean", default: "false" },
      { name: "success", type: "boolean", default: "false" },
      { name: "disabled", type: "boolean", default: "false" },
      { name: "icon", type: "ReactNode" },
    ],
  },
  {
    name: "FormGroup", path: "@/primitives/inputs",
    description: "Label + input + helper text + error message wrapper",
    implementation: IMPL_FORMGROUP,
    props: [
      { name: "label", type: "string" },
      { name: "required", type: "boolean", default: "false" },
      { name: "error", type: "string" },
      { name: "helper", type: "string" },
      { name: "children", type: "ReactNode" },
    ],
  },
  {
    name: "TagInput", path: "@/primitives/inputs",
    description: "Multi-tag input — type + Enter to add, Backspace to remove",
    implementation: IMPL_TAGINPUT,
    props: [
      { name: "value", type: "string[]" },
      { name: "onChange", type: "(tags: string[]) => void" },
      { name: "placeholder", type: "string" },
      { name: "maxTags", type: "number" },
      { name: "disabled", type: "boolean", default: "false" },
    ],
  },
];

export function FormsShowcaseWithSource() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    const btn = document.querySelector('[data-view-source="advanced-inputs"]');
    btn?.addEventListener("click", handler);
    return () => btn?.removeEventListener("click", handler);
  }, []);

  return (
    <>
      <FormsShowcase />
      <ViewSourceModal
        open={open}
        onClose={() => setOpen(false)}
        title="Advanced Inputs"
        code={SOURCE_CODE}
        components={COMPONENTS}
      />
    </>
  );
}
