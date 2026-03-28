import { Pagination, Stepper } from "@/primitives/navigation";
import { useState } from "react";

export function NavigationExtras() {
  const [page, setPage] = useState(1);
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col gap-5">
      {/* Pagination */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-muted)]">Pagination</span>
        </div>
        <div className="py-5 px-4 flex flex-col items-center gap-3">
          <Pagination
            totalPages={10}
            currentPage={page}
            onPageChange={setPage}
          />
          <span className="text-[11px] text-[var(--theme-fg)]">
            Page {page} of 10
          </span>
        </div>
      </div>

      {/* Stepper */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-muted)]">Stepper</span>
        </div>
        <div className="py-5 px-4 flex flex-col gap-4">
          <Stepper
            steps={["Account", "Profile", "Settings", "Review"]}
            currentStep={step}
            onChange={setStep}
          />
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step <= 0}
              className={`py-1.5 px-4 rounded-[var(--glass-radius-pill)] border border-[var(--theme-divider)] bg-transparent text-[var(--theme-fg)] text-xs font-[550] font-[var(--font-ui)] ${step <= 0 ? "cursor-not-allowed opacity-40" : "cursor-pointer opacity-100"}`}
            >
              Back
            </button>
            <button
              onClick={() => setStep(Math.min(3, step + 1))}
              disabled={step >= 3}
              className={`py-1.5 px-4 rounded-[var(--glass-radius-pill)] border-none bg-[var(--theme-bg-solid)] text-[var(--theme-fg-on-solid)] text-xs font-semibold font-[var(--font-ui)] ${step >= 3 ? "cursor-not-allowed opacity-60" : "cursor-pointer opacity-100"}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* BackToTop note */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)] py-3.5 px-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border border-[var(--theme-divider)] bg-[var(--theme-header-bg)] flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--theme-fg-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </div>
        <span className="text-xs text-[var(--theme-fg)] leading-normal">
          <strong className="font-semibold">BackToTop</strong> is a floating button primitive that appears on scroll. It is available via <code className="text-[11px] font-mono py-px px-1 rounded-[3px] bg-[var(--theme-divider)]">@/primitives/navigation</code> and can be placed at the page level.
        </span>
      </div>
    </div>
  );
}
