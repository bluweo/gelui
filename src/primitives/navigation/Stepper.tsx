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

  const circleSize = 28;
  const lineHeight = 2;

  const getCircleStyle = (index: number): CSSProperties => {
    const isCompleted = index < currentStep;
    const isCurrent = index === currentStep;

    return {
      width: `${circleSize}px`,
      height: `${circleSize}px`,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: 600,
      fontFamily: "var(--font-ui)",
      flexShrink: 0,
      cursor: onChange ? "pointer" : "default",
      transition: "background 0.2s, border-color 0.2s",
      ...(isCompleted
        ? {
            background: "#007AFF",
            color: "#fff",
            border: "2px solid #007AFF",
          }
        : isCurrent
          ? {
              background: "transparent",
              color: "#007AFF",
              border: "2px solid #007AFF",
            }
          : {
              background: "transparent",
              color: "var(--theme-fg-subtle)",
              border: "2px solid var(--theme-fg-faint)",
            }),
    };
  };

  const getLineStyle = (index: number): CSSProperties => {
    const isCompleted = index < currentStep;
    return {
      flex: 1,
      height: `${lineHeight}px`,
      background: isCompleted
        ? "#007AFF"
        : "var(--theme-fg-faint)",
      transition: "background 0.2s",
    };
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        ...style,
      }}
    >
      {steps.map((label, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            flex: i < steps.length - 1 ? 1 : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <div
              style={getCircleStyle(i)}
              onClick={() => onChange?.(i)}
            >
              {i < currentStep ? (
                <span style={{ fontSize: "14px", lineHeight: 1 }}>&#10003;</span>
              ) : (
                i + 1
              )}
            </div>
            <span
              style={{
                fontSize: "11px",
                fontFamily: "var(--font-ui)",
                fontWeight: i === currentStep ? 600 : 400,
                color:
                  i <= currentStep
                    ? "var(--theme-fg)"
                    : "var(--theme-fg-subtle)",
                textAlign: "center",
                maxWidth: "80px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              style={{
                ...getLineStyle(i),
                marginTop: `${circleSize / 2}px`,
                marginLeft: "8px",
                marginRight: "8px",
                alignSelf: "flex-start",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
