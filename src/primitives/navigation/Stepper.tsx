import { type CSSProperties } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

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
  const dark = useDarkMode();

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
              color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)",
              border: `2px solid ${dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"}`,
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
        : dark
          ? "rgba(255,255,255,0.15)"
          : "rgba(0,0,0,0.1)",
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
                    ? dark
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(0,0,0,0.8)"
                    : dark
                      ? "rgba(255,255,255,0.35)"
                      : "rgba(0,0,0,0.35)",
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
