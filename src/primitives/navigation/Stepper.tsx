import { type CSSProperties } from "react";

interface StepperProps {
  steps: string[];
  currentStep: number;
  onChange?: (step: number) => void;
  className?: string;
  style?: CSSProperties;
}

export function Stepper({
  steps,
  currentStep,
  onChange,
  className = "",
  style,
}: StepperProps) {
  return (
    <div
      className={`flex items-start w-full ${className}`}
      style={style}
    >
      {steps.map((label, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;

        return (
          <div
            key={i}
            className={`flex items-center ${i < steps.length - 1 ? "flex-1" : ""}`}
          >
            <div className="flex flex-col items-center gap-1.5">
              <div
                data-completed={isCompleted || undefined}
                data-current={isCurrent || undefined}
                onClick={() => onChange?.(i)}
                className={[
                  "w-7 h-7 rounded-full flex items-center justify-center",
                  "text-xs font-semibold font-[family-name:var(--font-ui)] shrink-0",
                  "transition-[background,border-color] duration-200 border-2",
                  onChange ? "cursor-pointer" : "cursor-default",
                  isCompleted
                    ? "bg-[#007AFF] text-white border-[#007AFF]"
                    : isCurrent
                      ? "bg-transparent text-[#007AFF] border-[#007AFF]"
                      : "bg-transparent text-[var(--theme-fg-subtle)] border-[var(--theme-fg-faint)]",
                ].join(" ")}
              >
                {isCompleted ? (
                  <span className="text-sm leading-none">&#10003;</span>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={[
                  "text-[11px] font-[family-name:var(--font-ui)] text-center max-w-[80px] whitespace-nowrap overflow-hidden text-ellipsis",
                  isCurrent ? "font-semibold" : "font-normal",
                  i <= currentStep ? "text-[var(--theme-fg)]" : "text-[var(--theme-fg-subtle)]",
                ].join(" ")}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={[
                  "flex-1 h-0.5 self-start mt-3.5 mx-2 transition-colors duration-200",
                  isCompleted ? "bg-[#007AFF]" : "bg-[var(--theme-fg-faint)]",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
