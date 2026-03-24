import { FormGroup, PasswordInput, NumberInput, Input } from "@/primitives/inputs";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";
import { useState } from "react";

export function FormsShowcase() {
  const isDark = useDarkMode();
  const [password, setPassword] = useState("");
  const [quantity, setQuantity] = useState(5);
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);

  const tableBg = isDark ? "#1a1a1a" : "#ffffff";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const headerColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
  const labelColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";
  const rowBorder = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* FormGroup with validation */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>FormGroup</span>
        </div>
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <FormGroup
            label="Email Address"
            htmlFor="email-demo"
            required
            helperText="We'll never share your email."
            error={showError ? "Please enter a valid email address" : undefined}
          >
            <Input
              placeholder="you@example.com"
              value={email}
              onChange={(v) => {
                setEmail(v);
                setShowError(v.length > 0 && !v.includes("@"));
              }}
              error={showError}
            />
          </FormGroup>
          <div style={{ fontSize: "11px", color: labelColor, fontStyle: "italic" }}>
            Type without "@" to see error state
          </div>
        </div>
      </div>

      {/* PasswordInput */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>Password Input</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
            <span style={{ fontSize: "12px", fontWeight: 550, color: labelColor }}>With Toggle</span>
            <div style={{ width: "220px" }}>
              <PasswordInput
                placeholder="Enter password"
                value={password}
                onChange={setPassword}
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
            <span style={{ fontSize: "12px", fontWeight: 550, color: labelColor }}>Disabled</span>
            <div style={{ width: "220px" }}>
              <PasswordInput
                placeholder="Disabled"
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {/* NumberInput */}
      <div style={{ borderRadius: "var(--glass-radius-sm, 10px)", overflow: "hidden", background: tableBg, border: `1px solid ${borderColor}` }}>
        <div style={{ padding: "8px 12px", background: headerBg, borderBottom: `1px solid ${borderColor}` }}>
          <span style={{ fontSize: "10px", fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: headerColor }}>Number Input</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
            <span style={{ fontSize: "12px", fontWeight: 550, color: labelColor }}>Default (1-20)</span>
            <NumberInput value={quantity} onChange={setQuantity} min={1} max={20} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
            <span style={{ fontSize: "12px", fontWeight: 550, color: labelColor }}>Step by 5</span>
            <NumberInput value={quantity} onChange={setQuantity} min={0} max={100} step={5} />
          </div>
        </div>
      </div>
    </div>
  );
}
