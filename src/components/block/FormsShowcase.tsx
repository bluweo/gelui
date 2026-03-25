import { Input, PasswordInput, NumberInput, OtpInput } from "@/primitives/inputs";
import { useDarkMode } from "@/primitives/hooks/useDarkMode";
import { useState } from "react";

export function FormsShowcase() {
  const isDark = useDarkMode();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [quantity, setQuantity] = useState(5);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);

  const tableBg = isDark ? "#1a1a1a" : "#ffffff";
  const headerBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const headerColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)";
  const labelColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)";
  const subColor = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
  const rowBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  const card: React.CSSProperties = {
    borderRadius: "var(--glass-radius-sm, 10px)",
    overflow: "hidden",
    background: tableBg,
    border: `1px solid ${borderColor}`,
  };

  const header: React.CSSProperties = {
    padding: "10px 14px",
    background: headerBg,
    borderBottom: `1px solid ${borderColor}`,
  };

  const row = (last = false): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    borderBottom: last ? undefined : `1px solid ${rowBorder}`,
  });

  return (
    <div suppressHydrationWarning style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* OTP / Pin Input */}
      <div style={card}>
        <div style={header}>
          <span className="type-overline" style={{ color: headerColor }}>OTP / Pin Input</span>
        </div>
        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* 6-digit OTP */}
          <div>
            <span className="type-caption" style={{ color: subColor, display: "block", marginBottom: 10 }}>6-digit verification code</span>
            <OtpInput
              length={6}
              value={otp}
              onChange={(v) => {
                setOtp(v);
                setOtpError(false);
              }}
            />
          </div>
          {/* 4-digit PIN + Error state — side by side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <span className="type-caption" style={{ color: subColor, display: "block", marginBottom: 10 }}>4-digit PIN (compact)</span>
              <OtpInput length={4} size="sm" />
            </div>
            <div>
              <span className="type-caption" style={{ color: subColor, display: "block", marginBottom: 10 }}>Error state</span>
              <OtpInput length={6} error value="12" size="sm" disabled />
            </div>
          </div>
        </div>
      </div>

      {/* Login Form — Username + Password */}
      <div style={card}>
        <div style={header}>
          <span className="type-overline" style={{ color: headerColor }}>Login Form</span>
        </div>
        {/* Username */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
          <span className="type-label" style={{ color: labelColor }}>Username</span>
          <div style={{ width: "70%", position: "relative" }}>
            <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", display: "flex", zIndex: 1 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <Input
              placeholder="Enter username"
              value={username}
              onChange={setUsername}
              style={{ paddingLeft: 36, background: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)" }}
            />
          </div>
        </div>
        {/* Password */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${rowBorder}` }}>
          <span className="type-label" style={{ color: labelColor }}>Password</span>
          <div style={{ width: "70%", position: "relative" }}>
            <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", display: "flex", zIndex: 1 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
              </svg>
            </div>
            <PasswordInput
              placeholder="Enter password"
              value={password}
              onChange={setPassword}
              style={{ paddingLeft: 36, background: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)" }}
            />
          </div>
        </div>
        {/* Disabled */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
          <span className="type-label" style={{ color: subColor }}>Disabled</span>
          <div style={{ width: "70%", position: "relative" }}>
            <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", display: "flex", zIndex: 1 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
              </svg>
            </div>
            <PasswordInput placeholder="Disabled" disabled style={{ paddingLeft: 36, background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }} />
          </div>
        </div>
      </div>

      {/* NumberInput */}
      <div style={card}>
        <div style={header}>
          <span className="type-overline" style={{ color: headerColor }}>Number Input</span>
        </div>
        <div style={row()}>
          <span className="type-label" style={{ color: labelColor }}>Default (1–20)</span>
          <NumberInput value={quantity} onChange={setQuantity} min={1} max={20} />
        </div>
        <div style={row(true)}>
          <span className="type-label" style={{ color: labelColor }}>Step by 5</span>
          <NumberInput value={quantity} onChange={setQuantity} min={0} max={100} step={5} />
        </div>
      </div>
    </div>
  );
}
