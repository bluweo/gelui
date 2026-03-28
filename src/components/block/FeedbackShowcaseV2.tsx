import { Spinner, Progress, Skeleton } from "@/primitives/feedback";
import { useState, useEffect } from "react";

export function FeedbackShowcaseV2() {
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 1));
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {/* Spinners & Progress */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-muted)]">Spinners & Progress</span>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4 border-b border-[var(--theme-divider)]">
          <span className="type-label text-[var(--theme-fg)]">Sizes</span>
          <div className="flex gap-4 items-center">
            <Spinner size="16px" />
            <Spinner size="24px" />
            <Spinner size="32px" />
          </div>
        </div>
        <div className="flex items-center justify-between py-3.5 px-4">
          <span className="type-label text-[var(--theme-fg)]">Progress ({progress}%)</span>
          <div className="w-[60%]">
            <Progress value={progress} />
          </div>
        </div>
      </div>

      {/* Skeleton Loaders */}
      <div className="rounded-[var(--glass-radius-sm)] overflow-hidden bg-[var(--theme-table-bg)] border border-[var(--theme-divider)]">
        <div className="py-2 px-3 bg-[var(--theme-header-bg)] border-b border-[var(--theme-divider)]">
          <span className="type-overline text-[var(--theme-fg-muted)]">Skeleton Loaders</span>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <span className="type-caption text-[var(--theme-fg-subtle)] block mb-2">Card Loading</span>
            <div className="flex gap-3 items-start">
              <Skeleton width="48px" height="48px" rounded="50%" />
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton width="60%" height="14px" />
                <Skeleton width="100%" height="10px" />
                <Skeleton width="80%" height="10px" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="type-caption text-[var(--theme-fg-subtle)] block mb-2">List Loading</span>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-2.5 items-center mb-2">
                <Skeleton width="32px" height="32px" rounded="8px" />
                <div className="flex-1 flex flex-col gap-1">
                  <Skeleton width={`${70 - i * 10}%`} height="12px" />
                  <Skeleton width={`${50 - i * 5}%`} height="9px" />
                </div>
              </div>
            ))}
          </div>
          <div>
            <span className="type-caption text-[var(--theme-fg-subtle)] block mb-2">Text Block</span>
            <div className="flex flex-col gap-2">
              <Skeleton width="40%" height="18px" />
              <Skeleton width="100%" height="10px" />
              <Skeleton width="95%" height="10px" />
              <Skeleton width="70%" height="10px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
