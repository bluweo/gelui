import { useState, useEffect } from "react";
import { FormsShowcase } from "./FormsShowcase";
import { ViewSourceModal } from "@/components/modal/ViewSourceModal";

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

const IMPLEMENTATION = `// OtpInput — multi-digit input with auto-focus, paste, success state
export function OtpInput({ length = 6, value, onChange, size = "md", error, disabled }) {
  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);
  const isComplete = value.replace(/\\s/g, "").length >= length;
  const showSuccess = isComplete && !error && !disabled;

  const handleChange = (index, digit) => {
    const arr = [...digits];
    arr[index] = digit.replace(/[^0-9]/g, "").slice(-1);
    onChange(arr.join(""));
    if (digit && index < length - 1) refs[index + 1].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0)
      refs[index - 1].focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    onChange(pasted);
  };

  return (
    <div style={{ display: "flex", gap: sizes[size].gap, alignItems: "center" }}>
      {digits.map((d, i) => (
        <input
          key={i} type="text" inputMode="numeric" maxLength={1}
          value={d} onChange={(e) => handleChange(i, e.target.value)}
          style={{
            width: sizes[size].w, height: sizes[size].h,
            textAlign: "center", fontSize: sizes[size].font,
            fontWeight: 650, fontFamily: "var(--font-mono)",
            borderRadius: "var(--glass-radius-sm)",
            border: \\\`2px solid \\\${
              error ? "#FF3B30" : showSuccess ? "#34C759"
              : focused === i ? "#000" : "rgba(0,0,0,0.1)"
            }\\\`,
          }}
        />
      ))}
      {/* Green checkmark when all digits filled */}
      {showSuccess && (
        <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width={12} height={12} viewBox="0 0 16 16"><path d="M3 8.5L6.5 12L13 4" stroke="#fff" strokeWidth="2.5" /></svg>
        </span>
      )}
    </div>
  );
}

// PasswordInput — wraps Input with show/hide eye toggle
export function PasswordInput({ placeholder, value, onChange, disabled, style }) {
  const [visible, setVisible] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <Input
        type={visible ? "text" : "password"}
        placeholder={placeholder} value={value}
        onChange={onChange} disabled={disabled}
        style={style}
      />
      <button onClick={() => setVisible(!visible)}
        style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}>
        {visible ? <EyeSlash size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

// NumberInput — circle +/- buttons with big number
export function NumberInput({ value, onChange, min, max, step = 1 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <button onClick={() => onChange(Math.max(min, value - step))}
        style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.06)" }}>
        −
      </button>
      <input value={value} style={{ width: 50, textAlign: "center", fontSize: 20, fontWeight: 700, fontFamily: "var(--font-mono)" }} />
      <button onClick={() => onChange(Math.min(max, value + step))}
        style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.06)" }}>
        +
      </button>
    </div>
  );
}`;

const COMPONENTS = [
  { name: "OtpInput", path: "@/primitives/inputs", description: "Multi-digit OTP/PIN input with auto-focus, paste support, success checkmark, sizes (sm/md/lg)" },
  { name: "PasswordInput", path: "@/primitives/inputs", description: "Password input with show/hide eye toggle, wraps Input primitive" },
  { name: "NumberInput", path: "@/primitives/inputs", description: "Numeric stepper with circle +/- buttons, min/max/step, big number display" },
  { name: "Input", path: "@/primitives/inputs", description: "Base text input with focus, validation, disabled states" },
  { name: "FormGroup", path: "@/primitives/inputs", description: "Label + input + helper text + error message wrapper" },
  { name: "TagInput", path: "@/primitives/inputs", description: "Multi-tag input — type + Enter to add, × to remove" },
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
        extraTabs={[{ label: "Implementation", code: IMPLEMENTATION }]}
      />
    </>
  );
}
