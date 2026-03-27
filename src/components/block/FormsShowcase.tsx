import { Input, PasswordInput, NumberInput, OtpInput } from "@/primitives/inputs";
import { useState } from "react";

export function FormsShowcase() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [quantity, setQuantity] = useState(5);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      {/* OTP / Pin Input */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2.5 px-3.5 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-muted)]">OTP / Pin Input</span>
        </div>
        {/* 6-digit verification code */}
        <div className="flex items-center justify-between py-3.5 px-4 border-b border-[var(--theme-divider)]">
          <span className="type-label text-[var(--theme-fg)]">6-digit code</span>
          <div className="w-[70%] flex justify-end">
            <OtpInput
              length={6}
              value={otp}
              onChange={(v) => {
                setOtp(v);
                setOtpError(false);
              }}
            />
          </div>
        </div>
        {/* 4-digit PIN compact */}
        <div className="flex items-center justify-between py-3.5 px-4 border-b border-[var(--theme-divider)]">
          <span className="type-label text-[var(--theme-fg)]">4-digit PIN</span>
          <div className="w-[70%] flex justify-end">
            <OtpInput length={4} size="sm" />
          </div>
        </div>
        {/* Error state */}
        <div className="flex items-center justify-between py-3.5 px-4">
          <span className="type-label text-[var(--theme-fg-subtle)]">Error state</span>
          <div className="w-[70%] flex justify-end">
            <OtpInput length={6} error value="12" size="sm" disabled />
          </div>
        </div>
      </div>

      {/* Login Form — Username + Password */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2.5 px-3.5 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-muted)]">Login Form</span>
        </div>
        {/* Username */}
        <div className="flex items-center justify-between py-3.5 px-4 border-b border-[var(--theme-divider)]">
          <span className="type-label text-[var(--theme-fg)]">Username</span>
          <div className="w-[70%] relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex z-[1]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--theme-fg-subtle)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <Input
              placeholder="Enter username"
              value={username}
              onChange={setUsername}
              style={{ paddingLeft: 36, background: "var(--theme-divider)" }}
            />
          </div>
        </div>
        {/* Password */}
        <div className="flex items-center justify-between py-3.5 px-4 border-b border-[var(--theme-divider)]">
          <span className="type-label text-[var(--theme-fg)]">Password</span>
          <div className="w-[70%] relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex z-[1]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--theme-fg-subtle)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
              </svg>
            </div>
            <PasswordInput
              placeholder="Enter password"
              value={password}
              onChange={setPassword}
              style={{ paddingLeft: 36, background: "var(--theme-divider)" }}
            />
          </div>
        </div>
        {/* Disabled */}
        <div className="flex items-center justify-between py-3.5 px-4">
          <span className="type-label text-[var(--theme-fg-subtle)]">Disabled</span>
          <div className="w-[70%] relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex z-[1]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--theme-fg-faint)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
              </svg>
            </div>
            <PasswordInput placeholder="Disabled" disabled style={{ paddingLeft: 36, background: "var(--theme-header-bg)" }} />
          </div>
        </div>
      </div>

      {/* NumberInput */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2.5 px-3.5 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-muted)]">Number Input</span>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4 border-b border-[var(--theme-divider)]">
          <span className="type-label text-[var(--theme-fg)]">Default (1–20)</span>
          <NumberInput value={quantity} onChange={setQuantity} min={1} max={20} />
        </div>
        <div className="flex items-center justify-between py-3.5 px-4">
          <span className="type-label text-[var(--theme-fg)]">Step by 5</span>
          <NumberInput value={quantity} onChange={setQuantity} min={0} max={100} step={5} />
        </div>
      </div>
    </div>
  );
}
