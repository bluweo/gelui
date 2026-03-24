import { type ReactNode, type CSSProperties } from "react";

export interface BaseProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
