import { forwardRef } from "react";

interface DSFooterProps {
  contrast: "dark" | "light";
  version?: string;
}

export const DSFooter = forwardRef<HTMLElement, DSFooterProps>(
  ({ contrast, version = "v0.25.1" }, ref) => {
    const textColor = contrast === "dark" ? "#ffffff" : "#000000";
    const dotColor = contrast === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)";
    const lineColor = contrast === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)";
    const borderColor = contrast === "dark" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.15)";

    return (
      <footer
        ref={ref}
        className="w-full mt-8 mb-2 -mx-4 px-0 max-[540px]:-mx-3"
        style={{ width: "calc(100% + 2rem)" }}
        data-contrast={contrast}
      >
        {/* Full-width border line */}
        <div
          className="w-full h-px mb-4"
          style={{ background: lineColor }}
        />
        <div className="max-w-[1100px] min-[1537px]:max-w-[1400px] mx-auto flex items-center justify-between gap-4 px-4 pb-3 max-[640px]:flex-col max-[640px]:gap-3">
          {/* Left: Copyright */}
          <p
            className="text-[13px] font-[500]"
            style={{ color: textColor }}
          >
            &copy; {new Date().getFullYear()} Bluweo. All rights reserved.
          </p>

          {/* Center: Links */}
          <div className="flex items-center gap-5 max-[640px]:gap-3">
            <a
              href="#"
              className="text-[13px] font-[500] hover:opacity-60 transition-opacity duration-200 no-underline"
              style={{ color: textColor }}
            >
              Cookie Policy
            </a>
            <span className="text-[13px]" style={{ color: dotColor }}>·</span>
            <a
              href="#"
              className="text-[13px] font-[500] hover:opacity-60 transition-opacity duration-200 no-underline"
              style={{ color: textColor }}
            >
              Privacy Policy
            </a>
            <span className="text-[13px]" style={{ color: dotColor }}>·</span>
            <a
              href="#"
              className="text-[13px] font-[500] hover:opacity-60 transition-opacity duration-200 no-underline"
              style={{ color: textColor }}
            >
              Terms & Conditions
            </a>
          </div>

          {/* Right: Version */}
          <span
            className="text-[12px] font-mono font-[500] select-none px-2.5 py-1 rounded-full"
            style={{
              color: textColor,
              border: `1px solid ${borderColor}`,
            }}
          >
            {version}
          </span>
        </div>
      </footer>
    );
  }
);

DSFooter.displayName = "DSFooter";
