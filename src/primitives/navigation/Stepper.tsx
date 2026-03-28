import { type CSSProperties } from "react";

type StepItem = string | { label: string; description?: string };

interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  onChange?: (step: number) => void;
  direction?: "horizontal" | "vertical";
  className?: string;
  style?: CSSProperties;
}

function getLabel(step: StepItem): string {
  return typeof step === "string" ? step : step.label;
}

function getDescription(step: StepItem): string | undefined {
  return typeof step === "string" ? undefined : step.description;
}

export function Stepper({
  steps,
  currentStep,
  onChange,
  direction = "horizontal",
  className = "",
  style,
}: StepperProps) {
  const isVertical = direction === "vertical";

  return (
    <div
      className={`flex ${isVertical ? "flex-col" : "items-start"} w-full ${className}`}
      style={style}
    >
      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;
        const label = getLabel(step);
        const desc = getDescription(step);

        return (
          <div
            key={i}
            className={`flex ${isVertical ? "flex-col" : "items-center"} ${!isVertical && i < steps.length - 1 ? "flex-1" : ""}`}
          >
            <div className={`flex ${isVertical ? "flex-row items-start gap-3" : "flex-col items-center gap-1.5"}`}>
              <div
                data-completed={isCompleted || undefined}
                data-current={isCurrent || undefined}
                onClick={() => onChange?.(i)}
                className={[
                  "w-7 h-7 rounded-full flex items-center justify-center",
                  "text-xs font-semibold font-[family-name:var(--font-ui)] shrink-0",
                  "transition-[background,border-color] duration-200 border-2",
                  isVertical ? "mt-0.5" : "",
                  onChange ? "cursor-pointer" : "cursor-default",
                  isCompleted
                    ? "bg-[var(--theme-fg)] text-[var(--theme-fg-on-solid)] border-[var(--theme-fg)]"
                    : isCurrent
                      ? "bg-transparent text-[var(--theme-fg)] border-[var(--theme-fg)]"
                      : "bg-transparent text-[var(--theme-fg-subtle)] border-[var(--theme-fg-faint)]",
                ].join(" ")}
              >
                {isCompleted ? (
                  <span className="text-sm leading-none">&#10003;</span>
                ) : (
                  i + 1
                )}
              </div>
              <div className={`flex flex-col ${isVertical ? "gap-0.5" : "items-center gap-0"}`}>
                <span
                  className={[
                    "text-[11px] font-[family-name:var(--font-ui)]",
                    isVertical ? "text-left" : "text-center max-w-[80px] whitespace-nowrap overflow-hidden text-ellipsis",
                    isCurrent ? "font-semibold" : "font-normal",
                    i <= currentStep ? "text-[var(--theme-fg)]" : "text-[var(--theme-fg-subtle)]",
                  ].join(" ")}
                >
                  {label}
                </span>
                {desc && isVertical && (
                  <span className={`text-[10px] font-[family-name:var(--font-ui)] ${i <= currentStep ? "text-[var(--theme-fg-muted)]" : "text-[var(--theme-fg-subtle)]"}`}>
                    {desc}
                  </span>
                )}
              </div>
            </div>
            {i < steps.length - 1 && (
              isVertical ? (
                <div
                  className={`transition-colors duration-200 rounded-full ${isCompleted ? "bg-[var(--theme-fg)]" : "bg-[var(--theme-fg-faint)]"}`}
                  style={{ width: "2px", height: "24px", marginLeft: "13px", marginTop: "4px", marginBottom: "4px" }}
                />
              ) : (
                <div
                  className={`flex-1 h-0.5 self-start mt-3.5 mx-2 transition-colors duration-200 ${isCompleted ? "bg-[var(--theme-fg)]" : "bg-[var(--theme-fg-faint)]"}`}
                />
              )
            )}
          </div>
        );
      })}
    </div>
  );
}
