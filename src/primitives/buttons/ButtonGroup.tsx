import { type ReactNode, type CSSProperties, Children, cloneElement, isValidElement } from "react";

interface ButtonGroupProps {
  children: ReactNode;
  attached?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function ButtonGroup({
  children,
  attached = false,
  className = "",
  style,
}: ButtonGroupProps) {
  const items = Children.toArray(children).filter(isValidElement);
  const count = items.length;

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: attached ? "0px" : "4px",
        fontFamily: "var(--font-ui)",
        ...style,
      }}
    >
      {items.map((child, i) => {
        if (!attached) return child;

        const isFirst = i === 0;
        const isLast = i === count - 1;

        const attachedStyle: CSSProperties = {
          borderRadius: isFirst
            ? "var(--glass-radius-sm, 8px) 0 0 var(--glass-radius-sm, 8px)"
            : isLast
              ? "0 var(--glass-radius-sm, 8px) var(--glass-radius-sm, 8px) 0"
              : "0",
          borderRight:
            !isLast
              ? "1px solid var(--theme-divider)"
              : undefined,
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return cloneElement(child as any, {
          key: i,
          style: {
            ...((child as any).props?.style || {}),
            ...attachedStyle,
          },
          shape: "rounded",
        });
      })}
    </div>
  );
}
